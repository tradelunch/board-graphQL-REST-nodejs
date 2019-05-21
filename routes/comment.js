const router = require('express').Router();
const controller = require('../controllers/comment');

router.get('/:commentId([\\d]+)?', controller.comment);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;