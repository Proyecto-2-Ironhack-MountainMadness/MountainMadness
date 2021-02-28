module.exports.home = (req, res, next) => {
    res.render('home')
}

module.exports.login = (req, res, next) =>(
    res.render('Login')
) 
