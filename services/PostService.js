const Post = require('../models/Post.js')
const FileService = require('./FileService.js')

class PostService {
  async create(post, image) {
    const fileName = FileService.saveFile(image)
    const createdPost = await Post.create({...post, image: fileName})
    return createdPost
  }

  async getAll() {
    const posts = await Post.find()
    return posts
  }

  async getOne(id) {

    if (!id) {
      throw new Error('Id is not specified')
    }

    const post = Post.findById(id)
    return post
  }

  async update(post, authorId) {
    if (!post._id) {
      throw new Error('Id is not specified')
    }

    const updatedPost = await Post.findByIdAndUpdate(post._id, {author_id: authorId}, {updatedAt: Date.now()}, post, {new: true})
    return updatedPost
  }

  async delete(postId) {
    if (!postId) {
      throw new Error('Id is not specified')
    }

    const postDelete = await Post.findByIdAndDelete(postId)
    return postDelete
  }
}

module.exports = new PostService()
