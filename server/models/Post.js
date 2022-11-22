const mongoose = require('mongoose');

const Post = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    likes: {
      type: Number,
      required: true,
    },
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', Post)