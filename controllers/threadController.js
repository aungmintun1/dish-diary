const catchAsync = require('./../utils/catchAsync');
const Thread = require('./../models/threadModel');
const Comment = require('./../models/commentModel');
const Like = require('./../models/likeModel');
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

exports.uploadThreadPhoto = upload.single('photo');

exports.resizeThreadPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.originalname = `recipe-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/recipes/${req.file.originalname}`);

  next();
});

exports.getAllThreads = catchAsync(async(req,res,next) => {
    const data = await Thread.find().populate({path:'comments'});

    //adds total Comments to each thread
    const modifiedData = data.map(thread => {
      // Convert document to a plain object to modify it
      const threadObject = thread.toObject();
      threadObject.totalComments = thread.comments.length;
      return threadObject;
    });

     res.status(200).json({
         status: 'success',
         results: {modifiedData},
     })

});

exports.createThread =  catchAsync(async (req,res,next) => {
    if(!req.body.username) req.body.username= req.user.name;
    if(!req.body.userId) req.body.userId= req.user.id;

    if(!req.body.profile) req.body.profile = req.user.id;

    if(req.file) req.body.photo = req.file.originalname;
    console.log('req.file is ', req.file);
   
    const newThread = await Thread.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newThread}
    });

});

exports.getThread = catchAsync(async (req, res, next) => {
    let thread = await Thread.findById(req.params.id).populate('likes').populate({path:'comments', populate: {path:'replies'}}).populate('profile')

    let commentTotal = await Comment.countDocuments({thread: req.params.id});
    let likeTotal = await Like.countDocuments({thread: req.params.id});
    
    res.status(200).json({
      status: 'success',
      data: {
        thread,
        totalComments: commentTotal,
        totalLikes: likeTotal
        
      }
    });
  });

  
exports.deleteThread = catchAsync(async (req, res, next) => {
  
const doc = await Thread.findByIdAndDelete(req.params.id);

if (!doc) {
  return next(new AppError('No thread found with that ID', 404));
}
  
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.updateThread = catchAsync(async(req,res,next) => {
    
  const doc = await Thread.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });


  if(!doc){
    return next(new AppError('No thread found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });

});