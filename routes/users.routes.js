const router = require("express").Router();
const secure = require('../middlewares/secure.middleware');
const upload = require('../config/storage.config');
const usersController = require("../controllers/users.controller");

router.get('/register', secure.isNotAuthenticated, usersController.register)

router.post('/register', secure.isNotAuthenticated, usersController.doRegister)

router.get('/login', secure.isNotAuthenticated, usersController.login)

router.post('/login', secure.isNotAuthenticated,usersController.doLogin)

router.post('/logout', secure.isAuthenticated, usersController.logout)

router.get('/profile', secure.isAuthenticated, usersController.profile)

router.post('/delete', usersController.delete)

router.get('/editProfile', secure.isAuthenticated, usersController.editProfile)

router.post('/editProfile', secure.isAuthenticated, upload.single("image"), usersController.doEditProfile)

module.exports = router;