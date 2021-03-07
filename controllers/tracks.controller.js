const mongoose = require("mongoose");
const Track = require("../models/Track.model");
const categories = require("../data/categories");
const User = require("../models/User.model");



//======================================================MOSTRAR TODAS LAS TRACKS=============================================
module.exports.tracksPage = (req, res, next) => {
  Track.find({})
    .populate('author')
    .then((tracks) => {

      res.render("track/list", { tracks, categories: categories, isAuthor: true });
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
    .populate('author')
    .then((track) => {
      if (req.currentUser) {
        track.author._id.equals(req.currentUser._id)
          ? res.render("track/trackDetails", {
            track,
            isAuthor: true,
            pointsJSON: encodeURIComponent(JSON.stringify(track.path))
          },
          )
          : res.render("track/trackDetails", { track })
      } else {
        res.render("track/trackDetails", { track })
      }
    })
    .catch((ines) => {
      next(ines)
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
  res.render("track/trackCreate", { categories: categories });
};

module.exports.doCreate = (req, res, next) => {
  if (req.file) {
    //==================Acordarse de requerir esto en los controladores que precisemos usar img===================
    req.body.image = req.file.path;/* `/uploads/${req.file.filename}`; */ //Antes usabamos antes con el multer pero con cloudinary usamos <--
  }

  if (req.body.path) {
    req.body.path = req.body.path.map(x => x.split(",").map(n => Number(n)));
  }
  console.log(req.body.path)

  function renderWithErrors(errors) {
    res.status(400).render("/", {
      errors: errors,
      route: req.body,
    });
  }



  req.body.author = req.currentUser._id

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
module.exports.edit = (req, res, next) => {
  res.render('track/trackEdit')
}

module.exports.doEdit = (req, res, next) => {
  Track.findByIdAndUpdate(req.body.path, req.body,
    console.log(path),
    {
      safe: true,
      upsert: true,
      new: true,
    })
    .then(track => {
      if (!track) {
        next(createError(404, 'Track not found'));
      } else {
        res.redirect('/track/Details')
      }
    })
    .catch(error => next(error));

}

//====================================================DELETE TRACKS========================================================

module.exports.trackDelete = (req, res, next) => {
  const id = req.params.id;


  Track.findByIdAndRemove(id)
    .then(track => {
      if (!track) {
        next(console.log('Track not found'));
      } else {
        res.redirect('/tracks');
      }
    })
    .catch(error => next(error));
}
//===========================================================
