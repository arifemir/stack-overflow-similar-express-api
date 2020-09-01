const express = require('express')
// /api
const router = express.Router()

router.use('/questions', require('./question'))
router.use('/auth', require('./auth'))

module.exports = router
