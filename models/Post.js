const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  author_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  content: {type: String, required: true},
  image: {type: String},
  createdAt: {type: Date, required: true},
  updatedAt: {type: Date}
})

module.exports = mongoose.model('Post', Post)
