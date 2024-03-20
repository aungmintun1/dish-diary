const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({

text: {
    type: String
},

username:{
  type: String
},

thread: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thread',
    // required: [true, 'comment must belong to a thread.']
  },

repliedTo: {
  type: mongoose.Schema.ObjectId,
    ref: 'Comment'
},

profile:{
  type: mongoose.Schema.ObjectId,
  ref: 'User'
}



},

// total # of likes
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

commentSchema.virtual('replies', {
  ref: 'Comment',
  foreignField: 'repliedTo',
  localField: '_id'
});

commentSchema.virtual('commentLikes', {
  ref: 'LikeComment',
  foreignField: 'comment',
  localField: '_id'
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

