const mongoose = require("mongoose");
const Track = require("../models/Track.model");

module.exports.create = (req, res, next) => {
  res.render("track/form");
};

module.exports.doCreate = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render("routes/form", {
      errors: errors,
      route: req.body,
    });
  }

  Track.create(req.body)
    .then((u) => {
      res.redirect(`/track/${id}`);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        renderWithErrors(e.errors);
      } else {
        next(e);
      }
    });
};

module.exports.edit = (req, res, next) => {
  Track.findById(req.params.id)
    .then((track) => {
      if (
        !track ||
        track.create.toString() !== req.currentUser.id.toString()
      ) {
        res.redirect("/");
      } else {
        res.render("track/form", { track });
      }
    })
    .catch((e) => next(e));
};

module.exports.doEdit = (req, res, next) => {
  function renderWithErrors(err) {
    res.status(400).render("track/form", {
      errors: err,
      track: req.body,
    });
  }
  Track.findById(req.params.id)
    .then((p) => {
      if (!p || p.author.toString() !== req.currentUser.id.toString()) {
        res.redirect("/");
      } else {
        Object.entries(req.body).forEach(([k, v]) => (p[k] = v));
        return p.save().then(() => {
          res.redirect(`/track/${req.params.id}`);
        });
      }
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        renderWithErrors(e.errors);
      } else {
        next(e);
      }
    });
};

module.exports.detail = (req, res, next) => {
  Track.findById(req.params.id)
    .then((track) => {
      res.render("track/detail", {
        track,
        canEdit: req.currentUser
          ? track.author.toString() === req.currentUser.id.toString()
          : false,
      });
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Track.findOneAndDelete({ _id: req.params.id, author: req.currentUser.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => next(e));
};



module.exports.tracksPage = (req, res, next) =>{
  res.render('track/list')
  
  
}

