const catchAsync = require('./../utils/catchAsync');
const Like = require('./../models/likeModel');
const AppError = require('./../utils/appError')

exports.getAllLikes = catchAsync(async(req,res,next) => {
    const data = await Like.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.addLike = catchAsync(async (req,res,next) => {

  //check if like exists, if exists return a 409 response
  const existingLike = await Like.findOne({ thread: req.params.threadId, username: req.user.id })

  if (existingLike) {
    return next(new AppError('you have already liked this thread', 409));
  }

    if(!req.body.thread) req.body.thread = req.params.threadId;
    if(!req.body.user) req.body.username = req.user.id;

    const newLike = await Like.create(req.body);


    res.status(201).json({
      status: 'success',
      data: {newLike}
    });

});

exports.getLike = catchAsync(async (req, res, next) => {
    let like = await Like.findById(req.params.id)
    
    res.status(200).json({
      status: 'success',
      data: {
        like
      }
    });
  });