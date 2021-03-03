module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/users/login')
    }
  }
  
  module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/users/profile')
    } else {
      next()
    }
  }