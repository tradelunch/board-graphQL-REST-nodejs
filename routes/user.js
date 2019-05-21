const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/:userid([\\d]+)?', controller.user);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

router.get('/list/:page([\\d]+)?', controller.userList);
router.get('/list/post/:userid/:page([\\d]+)?', controller.userPosts);
router.get('/list/comment/:userid/:page([\\d]+)?', controller.userComments);

module.exports = router;