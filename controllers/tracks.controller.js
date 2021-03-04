const mongoose = require("mongoose");
const Track = require("../models/Track.model");


//======================================================MOSTRAR TODAS LAS TRACKS=============================================
module.exports.tracksPage = (req, res, next) => {
  Track.find({})
    .then((tracks) => {
      res.render("track/list", { tracks });
    })
    .catch((e) => {
      console.log(e);
    });
};
//==================================================================================================
//======================================================MOSTRAR DETAIL DE UNA TRACK=============================================
module.exports.trackDetails = (req, res, next) => {
  const id = req.params.id;
  Track.findById(id)
    .then((track) => {
      res.render("track/trackDetails", { track });
    })
    .catch((e) => {
      console.log(e);
    });
};

/* module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Experience.findById(id)
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    .then(experience => {
      res.render('experiences/detail', {
        experience,
        pointsJSON: encodeURIComponent(JSON.stringify(experience.location.coordinates))
      })
    })
    .catch(err => next(err));
} */
//==================================================================================================


//=======================================================CREATE================================================================
module.exports.create = (req, res, next) => {
  res.render("track/trackCreate");
};

module.exports.doCreate = (req, res, next) => {
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

  Track.create(req.body)
    .then(() => {
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
module.exports.edit = (req, res, next) =>{
  res.render('track/trackEdit')
}

module.exports.doEdit = (req, res, next) => {
  console.log('pepe');
  User.findByIdAndUpdate(req.user.id, req.body,
    {
      safe: true,
      upsert: true,
      new: true,
    })
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/track/trackEdit')
      }})
      .catch(error => next(error));
  
}

//====================================================DELETE TRACKS========================================================

module.exports.trackDelete = (req, res, next) => {
  const id = req.params.id;


  Track.findByIdAndRemove(id)
    .then(track => {
      if (!track) {
        next(console.log( 'Track not found'));
      } else {
        res.redirect('/tracks');
      }
    })
    .catch(error => next(error));
}
//===========================================================
