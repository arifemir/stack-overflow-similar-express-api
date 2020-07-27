const sendJwtToClient = (user, res) => {
  const {JWT_COOKIE, NODE_ENV} = process.env
  const token = user.generateJwtFromUser();


  return res
  .status(200)
  .cookie('access_token', token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
    secure: NODE_ENV === 'development' ? false : true
  })
  .json({
    success: true,
    access_token: token,
    data: {
      name: user.name,
      email: user.email
    }
  })


}

module.exports = sendJwtToClient