const express = require('express');
const threadController = require('./../controllers/threadController');
const authController = require('./../controllers/authController');
const commentRouter = require('./../routes/commentRoutes')
const likeRouter = require('./../routes/likeRoutes')
const router = express.Router();

router.use('/:threadId/comments', commentRouter);
router.use('/:threadId/likes', likeRouter);

router.route('/').get(threadController.getAllThreads)
router.route('/createThread').post(authController.protect,threadController.uploadThreadPhoto, threadController.resizeThreadPhoto,threadController.createThread)

router.route('/getThread/:id').get(threadController.getThread)

router.route('/updateThread/:id').patch(threadController.updateThread);
router.route('/deleteThread/:id').delete(threadController.deleteThread);
module.exports = router;
