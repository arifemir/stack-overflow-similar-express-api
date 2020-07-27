const User = require('../models/user')
const asyncErrorWrapper = require('express-async-handler')
const sendJwtToClient = require('../helpers/authorization/sendJwtToClient')

register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body
  const user = await User.create({name, email, password, role})

  sendJwtToClient(user, res)
})

module.exports = {
  register
}
