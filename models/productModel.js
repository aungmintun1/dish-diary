const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({

        name: {
          type: String,
          required: [true, 'A product must have a name']

        },
        
        type:{
          type: String,
        },
        
        size:{
          type: String,
        },
        price: {
            type: Number,
            required: [true, 'A product must have a price']
        },

        photo: {
          type: String,
          default: "default.jpg"
        }



})

const Product= mongoose.model('Product', productSchema);
module.exports = Product;