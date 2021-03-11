const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track'
  },
  message: {
    type: String,
    required: true,
  },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;