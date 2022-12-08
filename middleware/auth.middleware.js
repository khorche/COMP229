const jwt = require("jsonwebtoken")

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (typeof token !== 'undefined') {
    return res.render('login', {'msg': 'No Valid Token Found'})
  }
  try {
    const decoded = jwt.verify(token, app.locals.TOKEN_KEY)
    req.user = decoded
  } catch (err) {
    return res.render('login', {'msg': 'Invalid Token'})
  }
  return next()
}

const noAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (typeof token !== 'undefined') {
    return next()
  }
  
  return res.redirect('/dashboard')
}

module.exports = {verifyAuth, noAuth}