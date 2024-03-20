const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(cartController.getAllCarts)
router.route('/addToCart/:id').patch(authController.protect,cartController.addToCart)
router.route('/deleteItem/:id').delete(authController.protect,cartController.deleteItem)
router.route('/edit/:id').patch(authController.protect,cartController.edit)

module.exports = router;
