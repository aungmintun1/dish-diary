const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({

        
      profile:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        },

       items:[{

        item: {
         type: mongoose.Schema.ObjectId,
         ref: 'Product'
        },
        quantity:{
          type: Number,
          default: 1
        },
        size:{
          type: String
        }

       }] 
      
});

cartSchema.methods.getTotalPrice = async function(items) {
  try {


const totalPrice = items.reduce((accumulator, product) => {

  const totalProductPrice = product.item.price * product.quantity;

  return accumulator + totalProductPrice;
}, 0);

 return totalPrice;
    
  } catch (err) {
    throw err; // This error will need to be caught by the caller of the function
  }
};


const Cart= mongoose.model('Cart', cartSchema);
module.exports = Cart;