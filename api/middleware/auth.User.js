const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  try {
      const token = req.cookies.MyCookie
    // const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.MyToken)
    const userId = decodedToken.userId
    req.auth = {
          userId: userId
      }
      next()
  } catch(error) {
      res.status(401).send('Merci de vous connecter')
  }
}