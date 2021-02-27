const mongoose = require("mongoose");
const Route = require("../models/Route.model");

module.exports.create = (req, res, next) => {
  res.render("routes/form");
};

module.exports.doCreate = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render("routes/form", {
      errors: errors,
      route: req.body,
    });
  }

  Route.create(req.body)
    .then((u) => {
      res.redirect(`/routes/${id}`);
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
  Route.findById(req.params.id)
    .then((route) => {
      if (
        !route ||
        route.create.toString() !== req.currentUser.id.toString()
      ) {
        res.redirect("/");
      } else {
        res.render("routes/form", { route });
      }
    })
    .catch((e) => next(e));
};

module.exports.doEdit = (req, res, next) => {
  function renderWithErrors(err) {
    res.status(400).render("routes/form", {
      errors: err,
      route: req.body,
    });
  }
  Route.findById(req.params.id)
    .then((p) => {
      if (!p || p.author.toString() !== req.currentUser.id.toString()) {
        res.redirect("/");
      } else {
        Object.entries(req.body).forEach(([k, v]) => (p[k] = v));
        return p.save().then(() => {
          res.redirect(`/routes/${req.params.id}`);
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
  Route.findById(req.params.id)
    .then((route) => {
      res.render("routes/detail", {
        route,
        canEdit: req.currentUser
          ? route.author.toString() === req.currentUser.id.toString()
          : false,
      });
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Route.findOneAndDelete({ _id: req.params.id, author: req.currentUser.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => next(e));
};



module.exports.routesPage = (req, res, next) =>{
  res.render('routes/list')
  
  
}

