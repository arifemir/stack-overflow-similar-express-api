const User = require('../models/user')
//errors
const asyncErrorWrapper = require('express-async-handler')
const CustomError = require('../helpers/error/CustomError')
//helpers
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers')
const {
	validateUserInput,
	comparePassword
} = require('../helpers/authorization/inputHelpers')

const sendEmail = require('../helpers/libraries/sendEmail')

const register = asyncErrorWrapper(async (req, res, next) => {
	const { name, email, password, role } = req.body
	const user = await User.create({ name, email, password, role })

	sendJwtToClient(user, res)
})

const login = asyncErrorWrapper(async (req, res, next) => {
	const { email, password } = req.body

	if (!validateUserInput(email, password))
		return next(new CustomError('Please check your inputs', 400))

	const user = await User.findOne({ email }).select('+password')

	if (!comparePassword(password, user.password))
		return next(new CustomError('Please check your credantials', 400))

	sendJwtToClient(user, res)
})

const logout = asyncErrorWrapper(async (req, res, next) => {
	const { NODE_ENV } = process.env

	return res
		.status(200)
		.cookie({
			httpOnly: true,
			expires: new Date(Date.now()),
			secure: NODE_ENV === 'development' ? false : true
		})
		.json({
			success: true,
			message: 'Logout successful'
		})
})

const getUser = (req, res, next) => {
	res.json({
		success: true,
		data: req.user.id,
		name: req.user.name
	})
}

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(
		req.user.id,
		{ profile_image: req.savedProfileImage },
		{ new: true, runValidators: true }
	)

	res.status(200).json({
		success: true,
		message: 'image upload successful',
		data: user
	})
})

const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
	const resetEmail = req.body.email

	const user = await User.findOne({ email: resetEmail })

	if (!user) {
		return next(new CustomError('There is no user with that email', 400))
	}

	const resetPasswordToken = user.getResetPasswordTokenFromUser()
	await user.save()

	const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`

	const emailTemplate = `<h3>Reset Your Password</h3>
	<p>This <a href="${resetPasswordUrl}" target="_blank">will expire in 1 hour</a></p>`

	try {
		await sendEmail({
			from: process.env.SMTP_USER,
			to: resetEmail,
			subject: 'Reset Your Password',
			html: emailTemplate
		})
		return res.status(200).json({
			success: true,
			message: 'Token Sent To Your Email'
		})
	} catch (err) {
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined
		await user.save()
		return next(new CustomError('Email Could Not Be Sent', 500))
	}
})

module.exports = {
	register,
	getUser,
	login,
	logout,
	imageUpload,
	forgotPassword
}
