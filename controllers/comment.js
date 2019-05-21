const { Comment } = require('../models');
const { Op } = require('sequelize');

module.exports = (function () {
    const C = {};

    C.comment = (req, res, next) => {
        const { commentId: id } = req.params;
        // res.send(`comment commentid: ${id}`);
        Comment.findByPk(id)
        .then(comment => res.json({ comment }));
    };

    C.create = (req, res, next) => {
        const { content, userId, postId } = req.body;
        // res.send(`create comment: ${content}, ${userid}`);
        Comment.create(req.body)
        .then(comment => res.json({ comment }));
    };

    C.update = (req, res, next) => {
        const { content, commentId: id } = req.body;
        // res.send(`update comment: ${content}, ${id}`);
        Comment.update({
            content
        }, {
            where: { id }
        })
        .then(ret => {
            console.log(ret);
            return comment.findOne({
                where: { id }
            }).then(comment => res.json({ comment }));
        })
        .catch(err => res.send(err));
    };

    C.delete = (req, res, next) => {
        const { commentId: id } = req.body;
        // res.send(`delete comment: ${id}`);
        Comment.detroy({ where: { id } })
        .then(() => (
                Comment.findOne({ where: { id } })
                .then(comment => res.json({ comment }))
            )
        )
        .catch(err => res.send(err));
    };
    return C;
})();