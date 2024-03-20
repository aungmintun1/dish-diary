const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema ({

thread: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thread',
    // required: [true, 'comment must belong to a thread.']
  },

username: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: [true, 'comment must belong to a thread.']
},

//quantity
//populate users 
//populate thread and comments

},

{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;

