const Thread = require('./../models/threadModel');
const Comment = require('./../models/commentModel');
const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const Cart = require('./../models/cartModel');
const catchAsync = require('./../utils/catchAsync');


exports.getThreads = catchAsync(async (req, res, next) => {
    const threadsWithoutTotal = await Thread.find().populate('likes').populate('comments').populate('profile');

     const threads = threadsWithoutTotal.map(thread => {
      // Convert document to a plain object to modify it
      const threadObject = thread.toObject();
      threadObject.totalComments = thread.comments.length;
      threadObject.totalLikes = thread.likes.length;
  
      return threadObject;
    });

    // const user = await User.findById(req.user.id);
   
    res.status(200).render('base', {
      threads,
    
    });
  });
  
  
  exports.getOneThread = catchAsync(async (req, res, next) => {
    
    //find user through id in URL and then populate shirts field
    const thread = await Thread.findById(req.params.threadId).populate('likes').populate('profile')
    
    const commentsWithoutTotal = await Comment.find({ thread: req.params.threadId })
  .populate('profile')
  .populate('commentLikes') // For top-level comments
  .populate({
    path: 'replies',
    populate: [
      { path: 'profile' },
      { path: 'commentLikes' }, // Populate commentLikes for the first level of replies
      {
        path: 'replies',
        populate: [
          { path: 'profile' },
          { path: 'commentLikes' }, // Populate commentLikes for the second level of replies
          {
            path: 'replies',
            populate: { 
              path: 'commentLikes', // Continue this pattern as needed for deeper levels
              // ... Any further nested levels would go here
            }
          }
        ]
      }
    ]
  });

  console.log(commentsWithoutTotal)

    const comments = commentsWithoutTotal.map(comment => {
      //first map of total likes
      const commentObject = comment.toObject();
      commentObject.totalLikes = comment.commentLikes.length;
      
      //second map
      if (commentObject.replies && commentObject.replies.length > 0) {
        commentObject.replies = commentObject.replies.map(reply=>{

          const replyObject = reply;
          replyObject.totalLikes= replyObject.commentLikes.length;

          //third map
          if (replyObject.replies && replyObject.replies.length > 0){
            replyObject.replies = replyObject.replies.map(third=>{
              const thirdObject = third;
              thirdObject.totalLikes = thirdObject.commentLikes.length
              return thirdObject;
          })
        }
          return replyObject;
        });
      }

      return commentObject;
    });

    const totalComments = comments.length;
    const totalThreadLikes = thread.likes.length;

    // const user = await User.findById(req.user.id);

    threadDirection = thread.directions;
    const directions = threadDirection.replace(/(\r\n|\n|\r)/gm, "<br>");

    threadIngredients = thread.ingredients;
    const ingredients = threadIngredients.replace(/(\r\n|\n|\r)/gm, "<br>");

    let saveCondition;
    if(req.user){
       saveCondition = req.user.favorites.find(save => save.equals(thread.id));
    }

    
   

    res.status(200).render('thread', {
      thread,
      directions,
      ingredients,
      comments,
      totalComments,
      totalThreadLikes,
      saveCondition
      
    });
    
  });

  exports.login = catchAsync(async (req, res, next) => {

    res.status(200).render('login', {
    status: "success"
    });
  });

  exports.account = catchAsync(async (req, res, next) => {

    res.status(200).render('account', {
    status: "success"
    });
  });

  exports.accountThreads = catchAsync(async (req, res, next) => {

    const threads = await Thread.find({userId: req.user.id}).populate('likes').populate('profile')

    res.status(200).render('accountThreads', {
    threads
    });

  });
  
  exports.accountFavorites = catchAsync(async (req, res, next) => {

   const user = await User.findById(req.user.id).populate('favorites');
  
   const threads = user.favorites;
  

    res.status(200).render('accountFavorites', {
      threads
    });

  });

  exports.shop = catchAsync(async (req, res, next) => {

    const products = await Product.find();

    const user = req.user;
    const cart = await Cart.findOne({ profile:user.id }).populate('items.item');
    
    const totalPrice = await cart.getTotalPrice(cart.items);

   
    res.status(200).render('shop', {
    products,
    cart,
    totalPrice

    });
  });

  exports.product = catchAsync(async (req, res, next) => {
    const user = req.user;
    const cart = await Cart.findOne({ profile:user.id }).populate('items.item');
    const product = await Product.findOne({_id: req.params.id});
    const totalPrice = await cart.getTotalPrice(cart.items);

    res.status(200).render('product', {
    product,
    cart,
    totalPrice

    });
  });