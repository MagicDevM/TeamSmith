function isAuth(req, res, next) {
  if (!req.session.user && !req.isAuthenticated()) return res.redirect('/auth/login')
  next()
}

module.exports = isAuth