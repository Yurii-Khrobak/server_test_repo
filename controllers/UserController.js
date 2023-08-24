const { validationResult } = require('express-validator')

const UserService = require('../services/UserService.js')

class UserController {
	async getAll(req, res) {
		try {
			const users = await UserService.getAll()
			return res.json(users)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async login(req, res) {
		try {
			const token = await UserService.login(req.body)
			return res.json(token)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}

	async registration(req, res) {
		try {
			const errors = validationResult(req)
			const user = await UserService.registration(req.body, errors)
			return res.json(user)
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
}

module.exports = new UserController()
