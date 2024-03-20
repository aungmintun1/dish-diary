const express = require('express');
const likeController = require('./../controllers/likeController');
const authController = require('./../controllers/authController');
const router = express.Router({ mergeParams: true });

router.route('/').get(likeController.getAllLikes)

router.route('/addLike').post(authController.protect, likeController.addLike)

// router.route('/Unlike').delete(likeController.Unlike)

module.exports = router;
