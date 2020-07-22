const express = require('express')
// /questions
const router = express.Router()

router.get('/', (req, res) => {
  res.send('questions home page')
})

router.get('/delete', (req, res) => {
  res.send('questions delete page')
})

module.exports = router