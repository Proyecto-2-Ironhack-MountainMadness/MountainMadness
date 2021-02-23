const mongoose = require("mongoose");
const User = require("../models/User.model");





module.exports.register = (req, res, next) => {
  res.render("users/register");
};

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render("users/register", {
      errors: errors,
      user: req.body,
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        renderWithErrors({
          email: "Ya existe un usuario con este email",
        });
      } else {

        User.create(req.body)
          .then(() => {
            // TO DO ---> sendActivationEmail(u.email, u.activationToken);
            res.redirect("/");
          })
          .catch((e) => {
            if (e instanceof mongoose.Error.ValidationError) {
              renderWithErrors(e.errors);
            } else {
              next(e);
            }
          });
      }
    })
    .catch((e) => next(e));
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
    //passport.authenticate('local-auth', (error, user, validations) => {
      // if (error) {
      //   next(error);
      /* } else  */if (!user) {
    res.status(400).render('users/login', { user: req.body, error: validations.error });
  } else {
    req.login(user, loginErr => {
      if (loginErr) next(loginErr)
      else res.redirect('/')
    })
  }


//========================NODEMAILER=================================
User.findOne({ email: req.body.email })
.then((user) => {
  if (!user) {
    renderWithErrors();
  } else {
    user.checkPassword(req.body.password).then((match) => {
      if (match) {
        if (user.active) {
          req.session.currentUserId = user.id;

          res.redirect("/profile");
        } else {
          renderWithErrors("Tu cuenta no está activa, mira tu email");
        }
      } else {
        renderWithErrors();
      }
    });
  }
})
.catch((e) => next(e));
};

