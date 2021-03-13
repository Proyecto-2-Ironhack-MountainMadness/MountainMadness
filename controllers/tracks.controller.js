const mongoose = require("mongoose");
const Track = require("../models/Track.model");
const Comment = require("../models/Comments.model")
const categories = require("../data/categories");
const valoracion = require("../data/valoracion");
const dificultad = require("../data/dificultad");
const User = require("../models/User.model");
const Like = require("../models/Like.model");

//======================================================MOSTRAR TODAS LAS TRACKS=============================================
module.exports.tracksPage = (req, res, next) => {
  Track.find({})
    .populate("author")
    .populate("likes")
    .then((tracks) => {
      res.render("track/list", {
        
        categories: categories,
        valoracion: valoracion,
         dificultad: dificultad,
        isAuthor: true,
        tracks: tracks.map((track) => {
          track.likeCount = track.likes.length;
          track.disabled = req.currentUser;
          /* ? track.author.toString() === req.currentUser._id.toString()
            : true;
            track.likedByUser = req.currentUser
            ? track.likes.some(
                (l) => l.user.toString() == req.currentUser._id.toString()
              )
            : false; */
          return track;
        }),
      });
    })
    .catch((e) => console.log(e));
};

module.exports.like = (req, res, next) => {
  Like.findOne({ track: req.params.trackId, user: req.currentUser._id })
    .then((like) => {
      if (!like) {
        return Like.create({
          track: req.params.trackId,
          user: req.currentUser._id,
        }).then(() => {
          // Dándole a like
          res.json({ add: 1 });
        });
      } else {
        return Like.findByIdAndDelete(like._id).then(() => {
          // Dándole a dislike
          res.json({ add: -1 });
        });
      }
    })
    .catch((e) => next(e));
};
//======================================================MOSTRAR DETAIL DE UNA TRACK=============================================
module.exports.trackDetails = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Track.findById(id)
    .populate("author")
    .populate("comments")
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


//=======================================================CREATE================================================================
module.exports.create = (req, res, next) => {
  res.render("track/trackCreate", { categories, valoracion, dificultad });
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
      console.log(req.body)
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

//====================================================UPDATE-EDITAR TRACKS========================================================
module.exports.edit = (req, res, next) => {
  const id = req.params.id;

  Track.findById(id).then((track) => {
    res.render("track/trackEdit", { track, categories, valoracion, dificultad });
  });
};

module.exports.doEdit = (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  if (req.body.path) {
    req.body.path = req.body.path.map((x) =>
      x.split(",").map((n) => Number(n))
    );
  }
  const { title, description, path, categories, valoracion, dificultad } = req.body;
  Track.findByIdAndUpdate(id, {
    title,
    description,
    categories,
    dificultad,
    valoracion,
    path,
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
//====================================================SEARCH BY TITLE========================================================
module.exports.results = (req, res, next) => {
  const { title } = req.query;
  const criteria = {};
  console.log(title);
  if (title) {
    criteria.title = new RegExp(title, "i");
  }

  Track.find(criteria)
    /* .populate("user") */
    .then((tracks) =>
      res.render("track/list", {
        tracks,
        title,
      })
    )
    .catch((error) => next(error));
};


//================================================COMMENTS==============================================

module.exports.sendComment = (req, res, next) =>{
  const id = req.params.trackId;
  console.log(id);
  Comment.create(req.body)
  .then((comment)=>{
    console.log(comment)
  
  Track.findByIdAndUpdate(id, {$push:{"comments": comment._id}})
    .then((track) => 
    res.redirect(`/tracks/${track._id}`))  
  
    .catch((ines) => {
      next(ines);
    });
  })
 }
