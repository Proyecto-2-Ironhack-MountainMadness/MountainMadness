const passport = require('passport');
const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");
const categoriesController = require("../controllers/categories.controller");


const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

// Misc
router.get("/", miscController.home);

//============================google===============================
router.get('/authenticate/google', passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}));
router.get('/authenticate/google/cb', usersController.doLoginGoogle);

//=======================nodemailer-activarToken=====================
router.get("/activate/:token",usersController.activate);

<<<<<<< HEAD
router.get("/categories/:name",categoriesController.getTracks);
 
=======
 //========================contact us ====================//

router.get("/contactus",miscController.contactus);

router.post("/contactus",miscController.docontactus);



//========================about us ====================//
router.get("/aboutUs",miscController.aboutus);


//========================terms ====================//
router.get("/terms",miscController.terms);

>>>>>>> 580ad0c64c091d9f14169825e0997955b54eb147

module.exports = router;
