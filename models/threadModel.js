const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema ({

question: {
    type: String,
    required: [true, 'enter a question'],
},
description: {
  type: String,
  required: [true, 'enter description'],
},
ingredients: {
  type: String,
  required: [true, 'enter the ingredients'],
},
directions: {
  type: String,
  required: [true, 'enter directions'],
},


username:{
  type: String,
},

userId:{
  type:String,
},

photo: {
  type: String,
  default: "default.jpg"
},
profile:{
  type: mongoose.Schema.ObjectId,
  ref: 'User'
}

},

// total thread likes
// total # of comments

{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

threadSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'thread',
    localField: '_id'
  });

  threadSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'thread',
    localField: '_id'
  });

//total likes method

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;

