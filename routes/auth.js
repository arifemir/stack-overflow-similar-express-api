const express = require('express')
const {getAccessToRoute} = require('../middlewares/authorization/auth')

// /auth
const router = express.Router()

router.post('/register', require('../controllers/auth').register)
router.post('/login', require('../controllers/auth').login)
router.post('/profile', getAccessToRoute, require('../controllers/auth').getUser)
router.get('/logout', getAccessToRoute, require('../controllers/auth').logout)

module.exports = router