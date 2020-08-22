const express = require('express')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const {
	register,
	login,
	getUser,
	logout,
	imageUpload
} = require('../controllers/auth')
const profileImageUpload = require('../middlewares/libraries/profileImageUpload')
// /auth
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', getAccessToRoute, getUser)
router.get('/logout', getAccessToRoute, logout)
router.post(
	'/upload',
	[getAccessToRoute, profileImageUpload.single('profile_image')],
	imageUpload
)
module.exports = router
