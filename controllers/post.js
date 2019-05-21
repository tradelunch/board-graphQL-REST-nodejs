module.exports = (function () {
    const Post = {};

    Post.post = (req, res, next) => {
        const { postid: id } = req.params;
        res.send(`post postid: ${id}`);
    };

    Post.create = (req, res, next) => {
        const { title, content, userid } = req.body;
        res.send(`create post: ${title}, ${content}, ${userid}`);
    };

    Post.update = (req, res, next) => {
        const { title, content, postid: id } = req.body;
        res.send(`update post: ${title}, ${content}, ${id}`);
    };

    Post.delete = (req, res, next) => {
        const { postid: id } = req.body;
        res.send(`delete post: ${id}`);
    };

    Post.list = (req, res, next) => {
        const { page = 1 } = req.params;
        res.send(`post list ${page}`);
    };

    Post.postComments =  (req, res, next) => {
        const { postid: id, page } = req.params;
        res.send(`GET comments with postid = ${id} and page = ${page}`);
    };    

    return Post;
})();

