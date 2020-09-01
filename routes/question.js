const express = require('express')
// /questions
const router = express.Router()

router.get('/', require('../controllers/question').getAllQuestions)

module.exports = router
