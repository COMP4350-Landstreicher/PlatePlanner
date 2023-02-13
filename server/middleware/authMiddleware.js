const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const {User} = require('../models/userModel')


const authenticate = asyncHandler(async (req, res, next) => {
	let token

	if ( req.cookies && req.cookies.token){
		try {
			
			token = req.cookies.token


			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			
			req.user = await User.findOne({ where: { email:decoded.email } })
			

			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error('Not authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

module.exports = { authenticate }
