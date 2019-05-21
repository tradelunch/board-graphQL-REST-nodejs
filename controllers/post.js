const { User, Post, Comment } = require('../models');
const { Op } = require('sequelize');

module.exports = (function () {
    const P = {};

    P.post = (req, res, next) => {
        const { postId: id } = req.params;
        Post.findByPk(id)
        .then(post => res.json({ post }))
        .catch(err => res.send(err));
    };

    P.create = (req, res, next) => {
        const { title, content, userId } = req.body;
        // res.send(`create post: ${title}, ${content}, ${userid}`);
        Post.create(req.body)
        .then(post => res.json({ post }))
        .catch(err => res.send(err));
    };

    P.update = async (req, res, next) => {
        const { title, content, author, postId: id } = req.body;
        // res.send(`update post: ${title}, ${content}, ${id}`);
        // TODO update할 때 lock 걸기
        const result = await Post.update({
            title,
            content,
            author
        }, {
            where: { id }
        })
        .then(result => {
            console.log(result);
            if (result == 1) 
                return post.findOne({
                    where: { id }
                })
                .then(post => res.json({ post }));
            else
                res.status(403).json({ Description: "Not Found" });
        })
        .catch(err => res.status(403).send(err));
    };

    P.delete = (req, res, next) => {
        const { postId: id } = req.body;
        // res.send(`delete post: ${id}`);
        Post.destroy({ where: { id } })
        .then(() => {
            return Post.findOne({ where: { id } }).then(post => res.json({ post }));
        })
        .catch(err => res.send(err));
    };

    P.list = (req, res, next) => {
        const { page = 1 } = req.params;
        const offset = page >=1 ? (page - 1) * 10 : 0;
        // res.send(`post list ${page}`);
        Post.findAll({
            order:[
                ['createdAt', 'DESC']                
            ],
            offset,
            limit: 10
        })
        .then(posts => res.json({ posts }))
        .catch(err => res.send(err));
    };

    P.postComments =  (req, res, next) => {
        const { postId, page } = req.params;
        const offset = page >=1 ? (page - 1) * 10 : 0;
        // res.send(`GET comments with postid = ${id} and page = ${page}`);
        Comment.findAll({
            where: { postId },
            order:[
                ['createdAt', 'ASC']
            ],
            offset,
            limit: 10  
        })
        .then(comments => res.json({ comments }))
        .catch(err => res.send(err));
    };
    return P;
})();

