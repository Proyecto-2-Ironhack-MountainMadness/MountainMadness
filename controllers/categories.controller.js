const mongoose = require("mongoose");
const Track = require("../models/Track.model");
const categories = require("../data/categories");
const valoracion = require("../data/valoracion");
const dificultad = require("../data/dificultad");


module.exports.getTracks = (req, res, next) => {
    const category = req.params.name;
    console.log(category)

    Track.find({categories: category},{valoracion: valoracion},{dificultad: dificultad} )
      .populate("author")
      .then((tracks) => {
          console.log(tracks)
        res.render("track/list", {
          tracks,
          categories: categories,
          dificultad: dificultad,
          valoracion: valoracion,
          isAuthor: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };