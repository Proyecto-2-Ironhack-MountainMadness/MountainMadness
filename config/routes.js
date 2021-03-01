const passport = require('passport')
const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const tracksController = require("../controllers/tracks.controller")
const secure = require('../middlewares/secure.middleware');
const Routes = require('../models/Track.model');

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

router.get('/delete', usersController.delete)

router.get('/editProfile', secure.isAuthenticated, usersController.editProfile)

router.post('/editProfile', secure.isAuthenticated, usersController.doEditProfile)


//Routes list

router.get("/tracks", tracksController.tracksPage);


//Routes create - edit - delete

router.get("/tracks/create", tracksController.create);
router.post("/tracks/create", tracksController.doCreate);
router.get("/tracks/:id", tracksController.detail);
router.get("/tracks/:id/edit", tracksController.edit);
router.post("/tracks/:id/edit", tracksController.doEdit);
router.get("/tracks/:id/delete", tracksController.delete);


//============================google===============================
router.get('/authenticate/google', passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/cb', usersController.doLoginGoogle)


//===================================================================


//=======================nodemailer-activarToken=====================
router.get("/activate/:token",usersController.activate);
//===================================================================
 
module.exports = router;
