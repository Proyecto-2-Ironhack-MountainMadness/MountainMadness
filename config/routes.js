const passport = require('passport')
const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const secure = require('../middlewares/secure.middleware')

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

// Misc

router.get("/", miscController.home);

// Login

router.get('/register', secure.isNotAuthenticated, usersController.register)

router.post('/register', secure.isNotAuthenticated, usersController.doRegister)

router.get('/login', secure.isNotAuthenticated, usersController.login)

router.post('/login', secure.isNotAuthenticated,usersController.doLogin)

router.post('/logout', secure.isAuthenticated, usersController.logout)

router.get('/profile', secure.isAuthenticated, usersController.profile)
//============================google===============================
router.get('/authenticate/google', passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/cb', usersController.doLoginGoogle)


//===================================================================


//=======================nodemailer-activarToken=====================
router.get("/activate/:token",usersController.activate);
//===================================================================
 
module.exports = router;
