module.exports = (function () {
    const User = {};

    User.user = (req, res, next) => {
        const { userId: id } = req.params;
        res.send(`user userid: ${id}`);
    };

    User.create = (req, res, next) => {
        const { name, email, password } = req.body;
        res.send(`create user: ${name}, ${email}, ${password}`);
    };

    User.update = (req, res, next) => {
        const { userId: id, name, email, password } = req.body;
        res.send(`update user: ${id}, ${name}, ${email}, ${password}`);
    };

    User.delete = (req, res, next) => {
        const { userId: id } = req.body;
        res.send(`delete user: ${id}`);
    };

    User.list = (req, res, next) => {
        const { page = 1 } = req.params;
        res.send(`users list ${page}`);
    };

    User.userPosts =  (req, res, next) => {
        const { userId: id, page } = req.params;
        res.send(`GET posts with userid = ${id} and page = ${page}`);
    };

    User.userComments =  (req, res, next) => {
        const { userId: id, page } = req.params;
        res.send(`GET comments with userid = ${id} and page = ${page}`);
    };    

    return User;
})();

