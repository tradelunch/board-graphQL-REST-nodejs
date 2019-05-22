const { User, Post, Comment } = require('../models');
const Dao = require('../daos/dao');

const dao = new Dao();
module.exports = (function () {
    const P = {};

    P.post = async (req, res, next) => {
        const { postId: id } = req.params;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const post = await dao.findByPk(Post, id);
            if (post) {
                const user = await post.getUser();
                const comments = await post.getComment({
                    include: [{
                        model: User,
                        as: 'User'
                    }],
                    limit: 10,
                    offset: 0,
                    required: false
                });
                return res.status(200).json({ post, user, comments });
            } else
                return res.status(404).send('Not Found');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    P.create = async (req, res, next) => {
        try {
            const post = await dao.create(Post, req.body);
            if (post) {
                const user = await post.getUser();
                return res.status(200).json({ post, user });
            } else
                return res.status(400).send('Failed to Create!');
        } catch (err) {
            return res.status(500).json({ err });
        }        
        // res.send(`create post: ${title}, ${content}, ${userid}`);
        Post.create(req.body)
        .then(post => res.json({ post }))
        .catch(err => res.send(err));
    };

    P.update = async (req, res, next) => {
        const { title, content, postId: id } = req.body;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const result = await dao.updateById(Post, { title, content }, id);
            if (result == 1) {
                let post = await dao.findByPk(Post, id);
                [ post ] = await Post.findAll({
                    where: {
                        id
                    },
                    include: [{
                            model: Comment,
                            as: 'Comment',
                            where: {
                                postId: id
                            },
                            offset: 0,
                            limit: 10,
                            order: [
                                ['createdAt', 'ASC']
                            ],
                            required: false
                        }, {
                            model: User,
                            as: 'User',
                            where: {
                                id: post.userId
                            },
                            required: false
                        }]
                });
                return res.status(200).json({ post });
            } else
                return res.status(400).send('Failed to Update!');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    P.delete = async (req, res, next) => {
        const { postId: id } = req.body;
        if (!id) return res.status(400).send('Invalid Input');

        try {
            const result = await dao.destroyById(Post, id);
            if (result == 1)
                return res.status(200).json({ result });
            else
                return res.status(400).send('Failed to Delete!');
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    P.list = async (req, res, next) => {
        let { page = 1, size: limit = 10} = req.params;
        limit = Number.parseInt(limit);
        const offset = page >=1 ? (page - 1) * limit : 0;
        try {
            const posts = await dao.findAll(Post, limit, offset, [ ['createdAt', 'DESC'] ], {});
            if (posts)
                return res.status(200).json({ posts });
            else
                return res.status(403).send('Not Found');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    P.postComments = async (req, res, next) => {
        let { postId: id, page = 1, size: limit = 10 } = req.params;
        limit = Number.parseInt(limit);
        const offset = page >=1 ? (page - 1) * limit : 0;
        try {
            
            // const post = await dao.findByPk(Post, id);
            // const comments = await post.getComment({ limit, offset });
            // return res.status(200).json({ post, comments });

            const post = await Post.findOne({
                where: {
                    id
                },
                include: [{
                        model: Comment,
                        as: 'Comment',
                        where: {
                            postId: id
                        },
                        order: [
                            ['createdAt', 'ASC']
                        ],
                        limit,
                        offset,
                        required: false,
                        include: [{
                            model: User,
                            as: 'User'
                        }]
                    }]
            });
            if (post)
                return res.status(200).json({ post });
            else
                return res.status(403).send('Not Found');
        } catch (err) {
            return res.status(500).json({ err });
        }
    };
    return P;
})();

