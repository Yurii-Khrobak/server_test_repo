const Router = require('express')
const {check} = require('express-validator')

const UserController = require('../controllers/UserController.js')

const userRouter = new Router()

userRouter.get('/users', UserController.getAll)
userRouter.post('/registration', [
//  check('req.body.login', 'Login musnt be null.').notEmpty(),
//  check('req.body.password', 'Password must be longer than 5 characters').isLength({min: 5})
], UserController.registration)
userRouter.post('/login', UserController.login)

module.exports = userRouter
