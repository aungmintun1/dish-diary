const catchAsync = require('./../utils/catchAsync');
const LikeComment = require('./../models/likecommentModel');

exports.getAllCommentLikes = catchAsync(async(req,res,next) => {
    const data = await LikeComment.find();

     res.status(200).json({
         status: 'success',
         results: {data},
     })

});

exports.addCommentLike = catchAsync(async (req,res,next) => {

    if(!req.body.comment) req.body.comment = req.params.commentLikeId;
    if(!req.body.user) req.body.username = req.user.id;

    const newLike = await LikeComment.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {newLike}
    });

});

exports.getCommentLike = catchAsync(async (req, res, next) => {
    let like = await LikeComment.findById(req.params.id)
    
    res.status(200).json({
      status: 'success',
      data: {
        like
      }
    });
  });