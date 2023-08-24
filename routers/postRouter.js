const Router = require('express')

const PostController = require('../controllers/PostController.js')

const authMiddleware = require('../middlewares/authMiddleware.js')
const authorMiddleware = require('../middlewares/authorMiddleware.js')

const postRouter = new Router()

postRouter.get('/posts', PostController.getAll)
postRouter.get('/posts/:id', PostController.getOne)
postRouter.post('/posts', authMiddleware, PostController.create)
postRouter.put('/posts', [authMiddleware, authorMiddleware], PostController.update)
postRouter.delete('/posts/:id', [authMiddleware, authorMiddleware], PostController.delete)

module.exports = postRouter
