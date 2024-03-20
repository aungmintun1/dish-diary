const express = require('express');
const likecommentController = require('./../controllers/likecommentController');
const authController = require('./../controllers/authController');
const router = express.Router({ mergeParams: true });

router.route('/').get(likecommentController.getAllCommentLikes)

router.route('/addCommentLike').post(authController.protect, likecommentController.addCommentLike)

// router.route('/Unlike').delete(likeController.Unlike)

module.exports = router;
