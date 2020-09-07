const express = require('express')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const {
	register,
	login,
	getUser,
	logout,
	imageUpload,
	forgotPassword,
	resetPassword
} = require('../controllers/auth')
const profileImageUpload = require('../middlewares/libraries/profileImageUpload')
// /auth
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', getAccessToRoute, getUser)
router.get('/logout', getAccessToRoute, logout)
router.get('/forgotpassword', forgotPassword)
router.put('/resetpassword', resetPassword)
router.post(
	'/upload',
	[getAccessToRoute, profileImageUpload.single('profile_image')],
	imageUpload
)

module.exports = router
