const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")


//Login function
const validateUser = asyncHandler(async (email, password, User) => {
        await User.sync()
        const user = await User.findOne({ where: {email:email} })

        return user && (await bcrypt.compare(password, user.password))
})

const getUser = asyncHandler(async (email, User) => {
        User.sync()
        return await User.findOne({ where: { email:email } })
})

const createUser = asyncHandler(async (email, userName, password, firstName, lastName, User) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        return await User.create({
                email: email,
                userName: userName,
                password: hash,
                firstName: firstName,
                lastName: lastName
        })
})

module.exports = {
	validateUser,
	getUser,
	createUser
}
