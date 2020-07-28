const express = require('express')
const {getAccessToRoute} = require('../middlewares/authorization/auth')

// /auth
const router = express.Router()

router.post('/register', require('../controllers/auth').register)
router.post('/profile', getAccessToRoute, require('../controllers/auth').getUser)

module.exports = router