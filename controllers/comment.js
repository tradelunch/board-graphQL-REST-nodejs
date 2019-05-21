const { comment } = require('../models');
const { Op } = require('sequelize');

module.exports = (function () {
    const Comment = {};

    Comment.comment = (req, res, next) => {
        const { commentId: id } = req.params;
        // res.send(`comment commentid: ${id}`);
        comment.findByPk(id)
        .then(comment => res.json({ comment }));
    };

    Comment.create = (req, res, next) => {
        const { content, userId } = req.body;
        // res.send(`create comment: ${content}, ${userid}`);
        comment.create(req.body).then(comment => res.json({ comment }));
    };

    Comment.update = async (req, res, next) => {
        const { content, commentId: id } = req.body;
        // res.send(`update comment: ${content}, ${id}`);
        // console.log(moment(Date.now()).tz("Asia/Seoul").format('YYYY-MM-DD-HH-mm-ss').toString());
        await comment.update({
            content,
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

    Comment.delete = async (req, res, next) => {
        const { commentId: id } = req.body;
        // res.send(`delete comment: ${id}`);
        // TODO 이미 삭제한 댓글 예외 처리
        await comment.update({
                deletedAt: new Date().getTimezoneOffset().toString()
            }, {
                where: {
                    id,
                    deletedAt: {
                        [Op.eq]: null
                    }
            }
        })
        .then(() => {
            return comment.findOne({ where: { id } }).then(comment => res.json({ comment }));
        })
        .catch(err => res.send(err));
    };
    return Comment;
})();