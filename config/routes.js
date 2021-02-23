const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const usersController = require("../controllers/users.controller")

// Misc

router.get("/", miscController.home);

// Login


router.get("/login",  usersController.login);
router.post("/login",  usersController.doLogin);

router.get("/register", usersController.register);
router.post("/register", usersController.doRegister);

//router.get("/userProfile", )

//=======================nodemailer-activarToken=====================
router.get("/activate/:token",usersController.activate);
 
module.exports = router;
