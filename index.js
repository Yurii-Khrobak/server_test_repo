const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const postRouter = require('./routers/postRouter.js')
const userRouter = require('./routers/userRouter.js')

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', postRouter)
app.use('/api', userRouter)

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		app.listen(PORT, () => console.log(`server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
