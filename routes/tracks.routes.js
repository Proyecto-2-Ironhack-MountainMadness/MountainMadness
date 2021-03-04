const router = require("express").Router();
const secure = require('../middlewares/secure.middleware');
const upload = require('../config/storage.config');
const tracksController = require("../controllers/tracks.controller");

router.get("/", secure.isAuthenticated, tracksController.tracksPage);

//Tenemos que configurar MULTER solo en las rutas en las que necesitemos subir una imagen !! (min_1:25 de la clase 13-Febrero)
//Siempre que tengamos una ruta en el que usemos un archivo img debemos añadirle el middleware --> upload.single("image"),

//Routes create - edit - delete

router.get("/create", secure.isAuthenticated, tracksController.create);
router.post("/create", secure.isAuthenticated, upload.single("image"), tracksController.doCreate);

router.get("/:id/edit", secure.isAuthenticated, tracksController.edit);
router.post("/:id/edit", secure.isAuthenticated, upload.single("image"), tracksController.doEdit);


router.get('/:id', secure.isAuthenticated, tracksController.trackDetails)
router.post('/:id/delete', tracksController.trackDelete)

module.exports = router;