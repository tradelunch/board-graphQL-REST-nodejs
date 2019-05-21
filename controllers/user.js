module.exports = (function () {
    const U = {};

    U.user = (req, res, next) => {
        const { userid: id } = req.params;
        res.send(`user userid: ${id}`);
    };

    U.create = (req, res, next) => {
        const { name, email, password } = req.body;
        res.send(`create user: ${name}, ${email}, ${password}`);
    };

    U.update = (req, res, next) => {
        const { userid: id, name, email, password } = req.body;
        res.send(`update user: ${id}, ${name}, ${email}, ${password}`);
    };

    U.delete = (req, res, next) => {
        const { userid: id } = req.body;
        res.send(`delete user: ${id}`);
    };

    U.userList = (req, res, next) => {
        const { page = 1 } = req.params;
        res.send(`users list ${page}`);
    };

    U.userPosts =  (req, res, next) => {
        const { userid: id, page } = req.params;
        res.send(`GET posts with userid = ${id} and page = ${page}`);
    };

    U.userComments =  (req, res, next) => {
        const { userid: id, page } = req.params;
        res.send(`GET comments with userid = ${id} and page = ${page}`);
    };    

    return U;
})();

