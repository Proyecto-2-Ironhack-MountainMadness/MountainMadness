module.exports.home = (req, res, next) => {
    res.render('home', {isHome: true})
}

module.exports.login = (req, res, next) =>(
    res.render('Login')
) 
