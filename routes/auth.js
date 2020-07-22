const express = require('express')
// /auth
const router = express.Router()

router.get('/', (req, res) => {
  res.send('auth home page')
})

router.get('/register', (req, res) => {
  res.send('auth register page')
})

module.exports = router