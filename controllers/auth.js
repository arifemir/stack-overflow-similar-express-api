const User = require('../models/user')
const asyncErrorWrapper = require('express-async-handler')
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers')

register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body
  const user = await User.create({name, email, password, role})

  sendJwtToClient(user, res)
})

getUser = (req, res, next) => {
  res.json({
    success: true,
    data: req.user.id,
    name: req.user.name
  })
}

module.exports = {
  register,
  getUser
}
