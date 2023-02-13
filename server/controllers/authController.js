const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const {User} = require("../models/userModel")
const validator = require("email-validator")

const login = asyncHandler( async (req, res) =>  {
	const { email, password } = req.body
	if( !email || !password){
		res.status(400)
		throw new Error("Please include all fields");
	}
	await User.sync()
	const user = await User.findOne({ where: { email:email } })

	

	if(user && (await bcrypt.compare(password, user.password))){
		res.cookie("token", jwt.sign({ email }, process.env.JWT_SECRET , { expiresIn: '7d' }), {httpOnly: true})
		res.json({"message": "Logged in successfully"})
	}
	else{
		res.status(400)
    		throw new Error('Invalid credentials')
	}

})

const register = asyncHandler( async (req, res) => {
	const { userName, email, password, firstName, lastName} = req.body

	if( !userName || !email || !password || !firstName || !lastName){
		res.status(400)
		throw new Error("Please include all fields");
	}
	if(!validator.validate(email)){
		res.status(400)
		throw new Error("Please include a valid email")
	}
	User.sync()
	const user = await User.findOne({ where: { email:email } })
	if(!user){
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const user = await User.create({
			email: email,
			userName: userName,
			password: hash,
			firstName: firstName,
			lastName: lastName
		})

		if(user){
			res.status(200).json({ message: "A new account has been successfully created"})
		}
	}
	else{
		res.status(400)
		throw new Error("User already exists")
	}

})

const logout =  asyncHandler( async (req, res) =>{
	res.clearCookie("token")
	res.status(200).json({ message: "Logged out"})
})

module.exports = {
	login,
	register,
	logout,
}
