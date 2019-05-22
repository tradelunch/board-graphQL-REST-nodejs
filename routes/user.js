const router = require('express').Router();
const controller = require('../controllers/User');

router.get('/:userId([\\d]+)?', controller.user);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

router.get('/list/:page([\\d]+)?/:size([\\d]+)?', controller.list);
router.get('/list/post/:userId/:page([\\d]+)?/:size([\\d]+)?', controller.userPosts);
router.get('/list/comment/:userId/:page([\\d]+)?/:size([\\d]+)?', controller.userComments);

module.exports = router;