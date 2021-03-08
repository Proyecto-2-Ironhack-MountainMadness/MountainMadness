const passport = require('passport');
const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller");

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

 //========================contact us ====================//

router.get("/contactus",miscController.contactus);

router.post("/contactus",miscController.docontactus);




module.exports = router;
