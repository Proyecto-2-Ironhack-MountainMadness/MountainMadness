const mongoose = require("mongoose");
const Track = require("../models/Track.model");
const Comment = require("../models/Comments.model")
const categories = require("../data/categories");


//======================================================MOSTRAR TODAS LAS TRACKS=============================================
module.exports.tracksPage = (req, res, next) => {
  Track.find({})
    .populate("author")
    .then((tracks) => {
      res.render("track/list", {
        tracks,
        categories: categories,
        isAuthor: true,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
//==================================================================================================
//======================================================MOSTRAR DETAIL DE UNA TRACK=============================================
module.exports.trackDetails = (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  Track.findById(id)
    .populate("author")
    .then((track) => {
      if (req.currentUser) {
        track.author._id.equals(req.currentUser._id)
          ? res.render("track/trackDetails", {
            track,
            isAuthor: true,
            pointsJSON: encodeURIComponent(JSON.stringify(track.path)),
          })
          : res.render("track/trackDetails", { track });
      } else {
        res.render("track/trackDetails", { track });
      }
    })
    .catch((ines) => {
      next(ines);
    });
};

//==================================================================================================

//=======================================================CREATE================================================================
module.exports.create = (req, res, next) => {
  res.render("track/trackCreate", { categories });
};

module.exports.doCreate = (req, res, next) => {
  if (req.file) {
    //==================Acordarse de requerir esto en los controladores que precisemos usar img===================
    req.body.image = req.file.path; /* `/uploads/${req.file.filename}`; */ //Antes usabamos antes con el multer pero con cloudinary usamos <--
  }

  if (req.body.path) {
    req.body.path = req.body.path.map((x) =>
      x.split(",").map((n) => Number(n))
    );
  }
  console.log(req.body.path);

  function renderWithErrors(errors) {
    res.status(400).render("/", {
      errors: errors,
      route: req.body,
    });
  }

  req.body.author = req.currentUser._id;

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
  const id = req.params.id;

  Track.findById(id)
    .then((track) => {
      res.render("track/trackEdit", { track, categories });
    });
};

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;
  if (req.body.path) {
    req.body.path = req.body.path.map((x) =>
      x.split(",").map((n) => Number(n))
    );
  }
  const { title, description, path, distance, } = req.body;
  Track.findByIdAndUpdate(id, {
    title,
    description,
    path,
    distance,
  })

    .then((track) => {
      if (!track) {
        next(createError(404, "Track not found"));
      } else {
        res.redirect(`/tracks/${track._id}`);
      }
    })
    .catch((error) => next(error));
};

//====================================================DELETE TRACKS========================================================

module.exports.trackDelete = (req, res, next) => {
  const id = req.params.id;

  Track.findByIdAndRemove(id)
    .then((track) => {
      if (!track) {
        next(console.log("Track not found"));
      } else {
        res.redirect("/tracks");
      }
    })
    .catch((error) => next(error));
};
//======================================================ADD COMMENTS=====
module.exports.comments = (req, res, next) => {

  const commentData = {
    message: req.body.message,
    user: req.currentUser._id,
    track: req.params.id,
  };
console.log("holaaa", commentData)

  const comment = new Comment(commentData);
  return comment
    .save()
          .then(comment => {Track.findByIdAndUpdate(req.params.id, {
              $push: {"comments": comment.message}
            })
    })

      
      .catch(error => next(error));
    }
    
