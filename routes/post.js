const router = require('express').Router();
const controller = require('../controllers/post');

router.get('/:postid([\\d]+)?', controller.post);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

router.get('/list/:page([\\d]+)?', controller.list);
router.get('/list/comment/:postId/:page([\\d]+)?', controller.postComments);

module.exports = router;