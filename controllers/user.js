const { User, Post, Comment } = require('../models');
const sequelize = require('sequelize');
const Dao = require('../daos/dao');

const dao = new Dao();
module.exports = (function () {
    const U = {};

    U.user = async (req, res, next) => {
        const { userId: id } = req.params;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const user = await dao.findByPk(User, id);
            if (user)
                return res.status(200).json({ user });
            else
                return res.status(403).send('Not Found');
        } catch (err) {
            return res.status(400).send(err);
        }
    };

    U.create = async (req, res, next) => {
        try {
            const user = await dao.create(User, req.body);
            if (user)
                return res.status(200).json({ user });
            else
                return res.status(400).send('Failed to Create!');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    U.update = async (req, res, next) => {
        return res.status(401).send('API Unauthorized');
        const { userId: id, name } = req.body;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const result = await dao.updateById(User, { name}, id);
            if (result == 1) {
                const comment = await dao.findByPk(User, id);
                return res.status(200).json({ User });
            } else
                return res.status(400).send('Failed to Update!');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    U.delete = async (req, res, next) => {
        return res.status(401).send('API Unauthorized');
        const { userId: id } = req.body;
        if (!id) return res.status(400).send('Invalid Input');
        try {
            const result = await dao.destroyById(User, id);
            if (result == 1)
                return res.status(200).json({ result });
            else
                return res.status(400).send('Failed to Delete!');
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    U.list = async (req, res, next) => {
        let { page = 1, size: limit = 10} = req.params;
        limit = Number.parseInt(limit)
        const offset = page >=1 ? (page - 1) * limit : 0;
        try {
            const users = await User.findAndCountAll({
                limit,
                offset, 
                order: [ ['createdAt', 'DESC'] ]
            });
            if (users)
                return res.status(200).json({ users });
            else
                return res.status(403).send('Not Found');
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
    };

    U.userPosts = async (req, res, next) => {
        let { userId: id, page = 1, size: limit = 10 } = req.params;
        limit = Number.parseInt(limit);
        const offset = page >=1 ? (page - 1) * limit : 0;
        try {
            // 아래와 같은 결과
            // const user = await dao.findByPk(User, id);
            // const posts = await user.getPost({ limit, offset });
            // return res.status(200).json({ user, posts });

            const result = await User.findOne({
                where: {
                    id
                },
                // attributes: [ [sequelize.fn('COUNT', 'id'), 'PostCount'] ],
                include: [{
                        model: Post,
                        as: 'posts',
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        limit,
                        offset,
                        required: false,
                    }]
            });
            if (result)
                return res.status(200).json({ result });
            else
                return res.status(403).send('Not Found');
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
    };

    U.userComments = async (req, res, next) => {
        let { userId: id, page = 1, size: limit = 10 } = req.params;
        limit = Number.parseInt(limit);
        const offset = page >=1 ? (page - 1) * limit : 0;
        try {
            // 아래와 같은 결과
            // const user = await dao.findByPk(User, id);
            // const comments = await user.getComment({ limit, offset });
            // return res.status(200).json({ user, comments });
            const user = await User.findByPk(id);
            if (user) {                
                const comments = await Comment.findAndCountAll({
                    where: {
                        userId: id,
                    },
                    order: [
                        ['createdAt', 'ASC']
                    ],
                    limit,
                    offset,
                    required: false
                });
                return res.status(200).json({ user, comments });
            } else
                return res.status(403).send('Not Found');
        } catch (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
    };    

    return U;
})();

