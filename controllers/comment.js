module.exports = (function () {
    const Comment = {};

    Comment.comment = (req, res, next) => {
        const { commentid: id } = req.params;
        res.send(`comment commentid: ${id}`);
    };

    Comment.create = (req, res, next) => {
        const { title, content, userid } = req.body;
        res.send(`create comment: ${content}, ${userid}`);
    };

    Comment.update = (req, res, next) => {
        const { title, content, commentid: id } = req.body;
        res.send(`update comment: ${content}, ${id}`);
    };

    Comment.delete = (req, res, next) => {
        const { commentid: id } = req.body;
        res.send(`delete comment: ${id}`);
    };

    // Comment.list = (req, res, next) => {
    //     const { page = 1 } = req.params;
    //     res.send(`comment list ${page}`);
    // };

    return Comment;
})();