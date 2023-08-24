const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User.js')

const generateAccesToken = id => {
	const payload = { id }
	return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })
}

class UserService {
	async getAll() {
		const users = await User.find()
		return users
	}

	async login(user) {
		const candidate = await User.findOne({ login: user.login })

		if (!candidate) {
			throw new Error('User not found.')
		}

		const validPassword = bcrypt.compareSync(user.password, candidate.password)

		if (!validPassword) {
			throw new Error('Invalid password.')
		}

		const token = generateAccesToken(candidate._id)
		return token
	}

	async registration(user, errors) {
		const candidate = await User.findOne({ login: user.login })

		if (!errors.isEmpty()) {
			throw new Error('Registration error')
		}

		if (candidate) {
			throw new Error('Login must be unique.')
		}

		const hashPassword = bcrypt.hashSync(user.password, 5)
		const userCreated = await User.create({
			login: user.login,
			password: hashPassword,
		})
		return userCreated
	}
}

module.exports = new UserService()
