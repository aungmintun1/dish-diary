const catchAsync = require('./../utils/catchAsync');
const Cart = require('./../models/cartModel');
const AppError = require('./../utils/appError')

exports.getAllCarts =  catchAsync(async (req,res,next) => {
  
         const carts = await Cart.find().populate('items.item');
   
           res.status(201).json({
             status: 'success',
             data: {
               carts
             }
           });
   
   });

   exports.addToCart =  catchAsync(async (req,res,next) => {

    const user = req.user;
    const cart = await Cart.findOne({ profile:user.id });
    const product = req.params.id;

    const quantity = req.body.quantity;
    const productSize = req.body.size;

    const existingItem = cart.items.find(product => product && product.item && product.item.equals(req.params.id));

    //iterates through each object in the items array
    //if one of the objects whose item field equals the id then it returns true and that item
  
    if (existingItem) {
      // If the shirt is already in the cart, increment the quantity that was inputted
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add the product along with the inputted quantity
      if(productSize){
      cart.items.push({ item: product, quantity: quantity, size:productSize });
      }

      else{
      cart.items.push({ item: product, quantity: quantity});
      }
    }

    // cart.items.push({item: product})

    await cart.save({ validateBeforeSave: false });

      res.status(201).json({
        status: 'success',
        data: {
          cart
        }
      });

});

exports.deleteItem = catchAsync(async(req,res,next) => {
  const user = req.user;
  const productId = req.params.id;

  const cart = await Cart.findOne({ profile:user.id });

  cart.items = cart.items.filter(product => !product.item.equals(productId));
  await cart.save();

  res.status(201).json({
    status: 'success',
    data: {
      cart
    }
  });

});

exports.edit = catchAsync(async(req,res,next) => {
  const user = req.user;
  const cart = await Cart.findOne({ profile:user.id });

  const productId = req.params.id;
  const quantity = req.body.quantity;
  const productSize = req.body.size;
 
  const cartItem = cart.items.find(product => product && product.item && product.item.equals(productId));

  if (cartItem) {
    cartItem.quantity = quantity;
    
    if (productSize) {
        cartItem.size = productSize;
    }
}
  
  await cart.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: {
      cart
    }
  });

});