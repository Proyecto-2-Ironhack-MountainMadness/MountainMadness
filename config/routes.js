const passport = require('passport')
const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const tracksController = require("../controllers/tracks.controller")
const secure = require('../middlewares/secure.middleware');
/* const multer = require("multer");
const upload = multer({dest: "./public/uploads/"}) */
const upload = require('./storage.config')


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

router.post('/editProfile', secure.isAuthenticated,upload.single("image"), usersController.doEditProfile)


//Tracks list

router.get("/tracks",secure.isAuthenticated, tracksController.tracksPage);

//Tenemos que configurar MULTER solo en las rutas en las que necesitemos subir una imagen !! (min_1:25 de la clase 13-Febrero)
//Siempre que tengamos una ruta en el que usemos un archivo img debemos añadirle el middleware --> upload.single("image"),
//Routes create - edit - delete

router.get("/trackCreate",secure.isAuthenticated, tracksController.create);
router.post("/trackCreate",secure.isAuthenticated, upload.single("image"), tracksController.doCreate);





//============================google===============================
router.get('/authenticate/google', passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/cb', usersController.doLoginGoogle)


//===================================================================


//=======================nodemailer-activarToken=====================
router.get("/activate/:token",usersController.activate);
//===================================================================
 
module.exports = router;
