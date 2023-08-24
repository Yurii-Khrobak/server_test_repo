const jwt = require('jsonwebtoken')
require('dotenv').config()

const PostService = require('../services/PostService.js')

const getAuthorId = req => {
	const token = req.headers.authorization.split(' ')[1]
	const decodeData = jwt.verify(token, process.env.SECRET)
	return decodeData.id
}

class PostController {
	async create(req, res) {
		try {
			const post = {
				author_id: getAuthorId(req),
				content: req.body.content,
				createdAt: Date.now(),
			}
			const postCreated = await PostService.create(post, req.files.image)

			res.json(postCreated)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async getAll(req, res) {
		try {
			const posts = await PostService.getAll()
			return res.json(posts)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async getOne(req, res) {
		try {
			const post = await PostService.getOne(req.params.id)
			return res.json(post)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async update(req, res) {
		try {
			const authorId = getAuthorId(req)
			const updatedPost = PostService.update(req.body, authorId)
			return res.json(updatedPost)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async delete(req, res) {
		try {
			const post = PostService.delete(req.params.id)
			return res.json(post)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
}

module.exports = new PostController()
