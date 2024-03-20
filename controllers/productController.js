const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');
const AppError = require('./../utils/appError')
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductPhoto = upload.single('photo');

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.originalname = `product-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.file.originalname}`);

  next();
});



exports.getAllProducts =  catchAsync(async (req,res,next) => {
  
         const products = await Product.find();
   
           res.status(201).json({
             status: 'success',
             data: {
               products
             }
           });
   
   });

   exports.getOneProduct =  catchAsync(async (req,res,next) => {
  
    const product = await Product.findById(req.params.id);

      res.status(201).json({
        status: 'success',
        data: {
          product
        }
      });

});


exports.createProduct =  catchAsync(async (req,res,next) => {

   if (req.file) req.body.photo = req.file.originalname;
 
        const product = await Product.create(req.body);
  
          res.status(201).json({
            status: 'success',
            data: {
              product
            }
          });
  
  });