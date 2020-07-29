const sendJwtToClient = (user, res) => {
  const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env
  const token = user.generateJwtFromUser();


  return res
  .status(200)
  .cookie('access_token', token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
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

const isTokenIncluded = (req) => req.headers.authorization && req.headers.authorization.startsWith('Bearer:')

const getAccessTokenFromHeader = (req) => req.headers.authorization.split(':')[1]


module.exports = {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader
}