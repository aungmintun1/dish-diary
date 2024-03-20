const mongoose = require('mongoose');

const likecommentSchema = new mongoose.Schema ({

comment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
  },

username: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    
},

//quantity
//populate users 
//populate thread and comments

},

{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


const LikeComment = mongoose.model('LikeComment', likecommentSchema);
module.exports = LikeComment;

