const jwt = require('jsonwebtoken')

const Post = require('../models/Post.js')
const {secret} = require('../config.js')

module.exports = async function(req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }

  try {
    const postId = null

    if (req.method === 'DELETE') {
      postId = req.params.id
    } else {
      postId = req.body._id
    }

    const token = req.headers.authorization.split(' ')[1]

    const decodeData = jwt.verify(token, secret)
    const authorId = decodeData.id

    const post = await Post.findById(postId)
i
    if (post.author_id != authorId) {
      return res.status(403).json({message: 'User dont author this post.'})
    }

    next()
  } catch(e) {
    return res.status(403).json({message: 'User unauthorized.'})
  }
}
