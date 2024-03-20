const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const Cart = require('./../models/cartModel');
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

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.originalname = `user-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.originalname}`);

  next();
});

exports.getAllUsers = catchAsync(async(req,res,next) => {
    const data = await User.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.signup =  catchAsync(async (req,res,next) => {
    const newUser = await User.create(req.body);

     const newCart = await Cart.create({
       profile: newUser._id, 
     });
    //Link the cart to the user by storing the user's _id
   // Other cart properties if needed
    

    res.status(201).json({
      status: 'success',
      data: {
        newUser,
        newCart
      }
    });

});

exports.getUser = catchAsync(async (req, res, next) => {
  let currentUser = await User.findById(req.params.id).populate('favorites').populate('cart');
  
  res.status(200).json({
    status: 'success',
    data: {
      currentUser
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
 
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates.',400));
  }

  if(req.file) req.body.photo = req.file.originalname;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.addFavorite = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (req.body.password || req.body.passwordConfirm){
    return next(new AppError('This route is not for password updates.',400));
  }

  if(req.file){
    return next(new AppError('This route is not for picture updates.',400));
  }

  const existingSave = user.favorites.find(save => save.equals(req.params.id));

  //if favorites contains req.params.id then error
  if(existingSave){
    return next(new AppError('You have already saved this recipe!.',409));
  }

  user.favorites.push(req.params.id);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

