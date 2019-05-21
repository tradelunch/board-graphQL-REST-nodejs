const { post, comment } = require('../models');
const { Op } = require('sequelize');


module.exports = (function () {
    const Post = {};

    Post.post = (req, res, next) => {
        const { postId: id } = req.params;
        post.findOne({
            where: { id }
        })
        .then(post => res.json({ post }))
        .catch(err => res.send(err));
    };

    Post.create = (req, res, next) => {
        const { title, content, postId: id } = req.body;
        // res.send(`create post: ${title}, ${content}, ${userid}`);
        post.create(req.body)
        .then(post => res.json({ post }))
        .catch(err => res.send(err));
    };

    Post.update = async (req, res, next) => {
        const { title, content, postId: id } = req.body;
        // res.send(`update post: ${title}, ${content}, ${id}`);
        // TODO update할 때 lock 걸기
        const result = await post.update({
            title,
            content,
            updatedAt: Date.now()
        }, {
            where: { id }
        })
        .then(ret => {
            console.log(ret);
            return post.findOne({
                where: { id }
            })
            .then(post => res.json({ post }));
        })
        .catch(err => res.send(err));
    };

    Post.delete = async (req, res, next) => {
        const { postId: id } = req.body;
        // res.send(`delete post: ${id}`);
        await post.update({
                deletedAt: Date.now()
            }, {
                where: {
                    id,
                    deletedAt: {
                        [Op.eq]: null
                    }
            }
        })
        .then(() => {
            return post.findOne({ where: { id } }).then(post => res.json({ post }));
        })
        .catch(err => res.send(err));
    };

    Post.list = (req, res, next) => {
        const { page = 1 } = req.params;
        const offset = page >=1 ? (page - 1) * 10 : 0;
        // res.send(`post list ${page}`);
        post.findAll({
            where: {
                deletedAt: { [Op.eq]: null }
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

    Post.postComments =  (req, res, next) => {
        const { postId, page } = req.params;
        const offset = page >=1 ? (page - 1) * 10 : 0;
        // res.send(`GET comments with postid = ${id} and page = ${page}`);
        comment.findAll({
            where: {
                postId,
                deletedAt: { [Op.eq]: null }
            },
            order:[
                ['createdAt', 'ASC']
            ],
            offset,
            limit: 10  
        })
        .then(comments => res.json({ comments }))
        .catch(err => res.send(err));
    };    

    return Post;
})();

