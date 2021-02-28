const User = require('../models/User.model')

module.exports.findUser = (req, res, next) => {
    if (req.session.currentUserId) {
        User.findById(req.session.currentUserId)
            .then((user) => {
                if (user) {
                    console.log("aqui esta el user",user)
                    req.currentUser = user
                    res.locals.currentUser = user
                }
            })
            .catch(e => {
                console.log("aqui el user ", e)
                next(e) 
            })
    } else {
        next()
    }


}