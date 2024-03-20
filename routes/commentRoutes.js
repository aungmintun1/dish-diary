const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');
const likecommentRouter = require('./../routes/likecommentRoutes')
const router = express.Router({ mergeParams: true });

router.use('/:commentLikeId/commentLikes', likecommentRouter);

router.route('/').get(commentController.getAllComments)
router.route('/getComment/:id').get(commentController.getComment)

router.route('/createComment').post(authController.protect, commentController.createComment)
router.route('/reply/:commentId').post(authController.protect,commentController.reply)

module.exports = router;
