const { User, Post, Comment } = require('../models');
const { Op } = require('sequelize');

module.exports = (function () {
    const U = {};

    U.user = (req, res, next) => {
        const { userId: id } = req.params;
        // res.send(`user userid: ${id}`);
        User.findByPk(id)
        .then(user => res.json({ user }))
        .catch(err => res.send(err));
    };

    U.create = (req, res, next) => {
        const { name } = req.body;
        // res.send(`create user: ${name}, ${email}, ${password}`);
        User.create(req.body)
        .then(user => res.json({ user }))
        .catch(err => res.send(err));
    };

    U.update = (req, res, next) => {
        const { userId: id, name } = req.body;
        // res.send(`update user: ${id}, ${name}, ${email}, ${password}`);
        return res.send('API Unauthorized').status(401);
        User.update({
            name,
            email,
        }, {
            where: { id }
        })
        .then(result => {
            return User.findOne({ where: { id } });
        })
        .then(user => res.json({ user }))
        .catch(err => res.send(err));
    };

    U.delete = (req, res, next) => {
        const { userId: id } = req.body;
        // res.send(`delete user: ${id}`);
        return res.send('API Unauthorized').status(401);

        User.destroy({
            where: { id }
        })
        .then(result => res.json({ result }))
        .catch(err => res.send(err));
    };

    U.list = (req, res, next) => {
        const { page = 1 } = req.params;
        // res.send(`users list ${page}`);
        const offset = page >=1 ? (page - 1) * 10 : 0;
        User.findAll({
            order:[
                ['createdAt', 'DESC']
            ],
            offset,
            limit: 10
        })
        .then(users => res.json({ users }))
        .catch(err => res.send(err));
    };

    U.userPosts =  (req, res, next) => {
        const { userId, page } = req.params;
        // res.send(`GET posts with userid = ${id} and page = ${page}`);
        const offset = page >=1 ? (page - 1) * 10 : 0;
        Post.findAll({
            where: { userId },
            order:[
                ['createdAt', 'DESC']
            ],
            offset,
            limit: 10
        })
        .then(posts => res.json({ posts }))
        .catch(err => res.send(err));
    };

    U.userComments =  (req, res, next) => {
        const { userId, page } = req.params;
        // res.send(`GET comments with userid = ${id} and page = ${page}`);
        const offset = page >=1 ? (page - 1) * 10 : 0;
        Comment.findAll({
            where: { userId },
            order:[
                ['createdAt', 'DESC']
            ],
            offset,
            limit: 10
        })
        .then(comments => res.json({ comments }))
        .catch(err => res.send(err));
    };    

    return U;
})();

