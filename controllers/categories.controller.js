const mongoose = require("mongoose");
const Track = require("../models/Track.model");
const categories = require("../data/categories");



module.exports.getTracks = (req, res, next) => {
    const category = req.params.name;

    Track.find({categories: category} )
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