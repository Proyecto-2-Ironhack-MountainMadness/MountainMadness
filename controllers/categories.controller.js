const mongoose = require("mongoose");
const Track = require("../models/Track.model");
const categories = require("../data/categories");



module.exports.getTracks = (req, res, next) => {
    const category = req.params.name;
    console.log(category)

    Track.find({categories: category} )
      .populate("author")
      .then((tracks) => {
          console.log(tracks)
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