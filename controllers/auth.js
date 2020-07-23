const User = require('../models/user')
const asyncErrorWrapper = require('express-async-handler')

register = asyncErrorWrapper(async (req, res, next) => {
  
    const user = await User.create({
      name:'name',
      email:'emassdil@gmail.com',
      password:'pad'
    })
  
    res.status(200).json({success: true, data: user})

})

module.exports = {
  register
}
