const mongoose = require("mongoose");
const Track = require("../models/Track.model");

module.exports.create = (req, res, next) => {
  res.render("track/trackCreate");
};

module.exports.doCreate = (req, res, next) => {
  console.log("caca")
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




module.exports.tracksPage = (req, res, next) => {
  Track.find({})
    .then((tracks) => {
      res.render("track/list", { tracks })
    })
    .catch((e) => {
      console.log(e)
    })


}

