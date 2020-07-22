const express = require('express')
// /auth
const router = express.Router()

router.post('/register', require('../controllers/auth').register)

module.exports = router