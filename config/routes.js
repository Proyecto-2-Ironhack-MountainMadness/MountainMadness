const passport = require('passport')
const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const routesController = require("../controllers/routes.controller")
const secure = require('../middlewares/secure.middleware');
const Routes = require('../models/Route.model');

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

//Routes list

router.get("/routes", routesController.routesPage);


//Routes create - edit - delete

router.get("/routes/create", routesController.create);
router.post("/routes/create", routesController.doCreate);
router.get("/routes/:id", routesController.detail);
router.get("/routes/:id/edit", routesController.edit);
router.post("/routes/:id/edit", routesController.doEdit);
router.get("/routes/:id/delete", routesController.delete);


//============================google===============================
router.get('/authenticate/google', passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/cb', usersController.doLoginGoogle)


//===================================================================


//=======================nodemailer-activarToken=====================
router.get("/activate/:token",usersController.activate);
//===================================================================
 
module.exports = router;
