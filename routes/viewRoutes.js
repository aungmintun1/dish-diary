const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(authController.isLoggedIn, viewsController.getThreads)
router.route('/thread/:threadId').get(authController.isLoggedIn, viewsController.getOneThread)
router.route('/login').get(viewsController.login)
router.route('/logout').get(authController.logout)

router.route('/account').get(authController.isLoggedIn,viewsController.account)
router.route('/accountThreads').get(authController.isLoggedIn,viewsController.accountThreads)
router.route('/accountFavorites').get(authController.isLoggedIn,viewsController.accountFavorites)
// router.route('/signup').get(viewsController.signup)

router.route('/shop').get(authController.isLoggedIn,viewsController.shop)
router.route('/product/:id').get(authController.isLoggedIn,viewsController.product)

module.exports = router;
