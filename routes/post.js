const router = require('express').Router();
const controller = require('../controllers/post');

router.get('/:postId([\\d]+)?', controller.post);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', (req, res, next) => {
    const { postId: id } = req.body;
    if (id == undefined)
        res.redirect('/post/list');
    next();
}, controller.delete);

router.get('/list/:page([\\d]+)?', controller.list);
router.get('/list/comment/:postId/:page([\\d]+)?', controller.postComments);

module.exports = router;