const mongoose = require('mongoose')

const User = new mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String}
  //thumbnail
})

module.exports = mongoose.model('User', User)
