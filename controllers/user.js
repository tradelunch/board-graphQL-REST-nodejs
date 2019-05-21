const { user, post, comment } = require('../models');
const { Op } = require('sequelize');

module.exports = (function () {
    const User = {};

    User.user = (req, res, next) => {
        const { userId: id } = req.params;
        // res.send(`user userid: ${id}`);
        user.findOne({
            where: { id }
        })
        .then(user => res.json({ user }))
        .catch(err => res.send(err));
    };

    User.create = (req, res, next) => {
        const { name, email, password } = req.body;
        // res.send(`create user: ${name}, ${email}, ${password}`);
        user.create(req.body)
        .then(user => res.json({ user }))
        .catch(err => res.send(err));
    };

    User.update = (req, res, next) => {
        const { userId: id, name, email, password } = req.body;
        // res.send(`update user: ${id}, ${name}, ${email}, ${password}`);
        user.update({
            name,
            email,
            password,
            updatedAt: Date.now()
        }, {
            where: { id }
        })
        .then(result => {
            return user.findOne({
                where: { id }
            });
        })
        .then(user => res.json({ user }))
        .catch(err => res.send(err));
    };

    User.delete = (req, res, next) => {
        const { userId: id } = req.body;
        // res.send(`delete user: ${id}`);
        return res.send('삭제 불가능');

        user.destroy({
            where: { id }
        })
        .then(result => res.json({ result }))
        .catch(err => res.send(err));
    };

    User.list = (req, res, next) => {
        const { page = 1 } = req.params;
        // res.send(`users list ${page}`);
        const offset = page >=1 ? (page - 1) * 10 : 0;
        user.findAll({
            order:[
                ['createdAt', 'DESC']
            ],
            offset,
            limit: 10
        })
        .then(users => res.json({ users }))
        .catch(err => res.send(err));
    };

    User.userPosts =  (req, res, next) => {
        const { userId, page } = req.params;
        // res.send(`GET posts with userid = ${id} and page = ${page}`);
        const offset = page >=1 ? (page - 1) * 10 : 0;
        post.findAll({
            where: {
                deletedAt: { [Op.eq]: null },
                userId
            },
            order:[
                ['createdAt', 'DESC']
            ],
            offset,
            limit: 10
        })
        .then(posts => res.json({ posts }))
        .catch(err => res.send(err));
    };

    User.userComments =  (req, res, next) => {
        const { userId, page } = req.params;
        // res.send(`GET comments with userid = ${id} and page = ${page}`);
        const offset = page >=1 ? (page - 1) * 10 : 0;
        comment.findAll({
            where: {
                deletedAt: { [Op.eq]: null },
                userId
            },
            order:[
                ['createdAt', 'DESC']
            ],
            offset,
            limit: 10
        })
        .then(comments => res.json({ comments }))
        .catch(err => res.send(err));
    };    

    return User;
})();

