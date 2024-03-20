const express = require('express');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/createProduct').post(productController.uploadProductPhoto,productController.resizeProductPhoto,productController.createProduct)
router.route('/').get(productController.getAllProducts)
router.route('/getProduct/:id').get(productController.getOneProduct)

module.exports = router;
