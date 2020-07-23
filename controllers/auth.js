const User = require('../models/user')

register = async (req, res, next) => {
  
  const user = await User.create({
    name:'name',
    email:'emasdil@gmail.com ',
    password:'password'
  })

  res.status(200).json({success: true, data: user})
}

module.exports = {
  register
}
