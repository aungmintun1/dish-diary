const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('./../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {

    let cart = await Cart.findOne({ profile:req.user.id }).populate('items.item');

    const lineItems = cart.items.map(product => ({
      price_data: {
        currency: 'usd',
        unit_amount: product.item.price* 100, // Convert price to cents
        product_data: {
          name: `${product.item.name}`,
        },
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}`,
      cancel_url:`${req.protocol}://${req.get('host')}`,
      customer_email: req.user.email,
      client_reference_id: req.user.id,
      line_items: lineItems,
      mode:'payment',
    });
  
    res.status(200).json({
      status: 'success',
      session
    });

  });