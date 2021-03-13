const Track = require("../models/Track.model");
const categories = require("../data/categories");
const valoracion = require("../data/valoracion");
const dificultad = require("../data/dificultad");
const { contactUsEmail } = require("../config/mailer.config")

module.exports.home = (req, res, next) => {
  Track.find({})
    .then((tracks) => {
      res.render('home', { isHome: true, tracks, categories: categories, valoracion: valoracion, dificultad: dificultad })
    })
    .catch((e) => {
      console.log(e);
    });

}
//=================================CONTACT US ===============================================
module.exports.contactus = (req, res, next) => {
  res.render('partials/contactus')
}



module.exports.docontactus = (req, res, next) => {
  const { email, subject } = req.body;
  contactUsEmail(email, subject);
  res.render('home')
}



//======================================ABOUT US============================================

module.exports.aboutus = (req, res, next) => {
  res.render('partials/aboutUs')
}

//==================================== TERMS  ==============================================

module.exports.terms = (req, res, next) => {
  res.render('partials/terms')
}

//==================================== JOBS  ==============================================
module.exports.jobs = (req, res, next) => {
  res.render('partials/jobs')
}

//==================================== DONATE  ==============================================
module.exports.donate = (req, res, next) => {
 res.render('partials/donate')
}