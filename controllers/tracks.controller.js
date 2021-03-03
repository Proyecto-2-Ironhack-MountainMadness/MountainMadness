const mongoose = require("mongoose");
const Track = require("../models/Track.model");


//======================================================MOSTRAR TRACKS=============================================
module.exports.tracksPage = (req, res, next) => {
  Track.find({})
    .then((tracks) => {
      res.render("track/list", { tracks });
    })
    .catch((e) => {
      console.log(e);
    });
};
//===========================================================


//=======================================================CREATE================================================================
module.exports.create = (req, res, next) => {
  res.render("track/trackCreate");
};

module.exports.doCreate = (req, res, next) => {
  console.log("caca");
  console.log(req.file);
  res.render("home");
  if(req.file) {
  //==================Acordarse de requerir esto en los controladores que precisemos usar img===================
    req.body.image = req.file.path;/* `/uploads/${req.file.filename}`; */ //Antes usabamos antes con el multer pero con cloudinary usamos <--
  }
  function renderWithErrors(errors) {
    res.status(400).render("/", {
      errors: errors,
      route: req.body,
    });
  }
  console.log(req.body)
  Track.create(req.body)
    .then((track) => {
      console.log("track",track )
      res.redirect(`/tracks`);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        renderWithErrors(e.errors);
      } else {
        next(e);
      }
    });
};
//===========================================================

//====================================================UPDATE-EDITAR TRACKS========================================================



