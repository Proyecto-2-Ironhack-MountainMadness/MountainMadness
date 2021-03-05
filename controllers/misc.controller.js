const Track = require("../models/Track.model");
const categories = require("../data/categories")

module.exports.home = (req, res, next) => {
    Track.find({})
    .then((tracks) => {
       /*  res.render("track/list", { tracks , categories: categories}); */
        res.render('home', {isHome: true , tracks , categories: categories})
      })
      .catch((e) => {
        console.log(e);
      });

}

module.exports.login = (req, res, next) =>(
    res.render('Login')
) 
