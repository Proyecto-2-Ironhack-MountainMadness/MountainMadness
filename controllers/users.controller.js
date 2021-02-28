const mongoose = require("mongoose");
const User = require("../models/User.model");
const passport = require("passport")

const { sendActivationEmail } = require("../config/mailer.config"); //Nodemailer



//=================================REGISTER================================================

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
          .then((u) => {
            sendActivationEmail(u.email, u.activationToken); //NODEMAILER
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
//=======================================LOGIN===================================================
module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('users/login', { user: req.body, error: validations.error });
    } else {
      req.login(user, loginErr => {
        if (loginErr) next(loginErr)
        else res.redirect('/')
      })
    }
  })(req, res, next);
};
  //========================NODEMAILER=============================
/*   User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        renderWithErrors();
      } else {
        user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              if (user.active) {
                req.session.currentUserId = user.id;

                res.redirect("/userProfile");
              } else {
                renderWithErrors("Tu cuenta no está activa, mira tu email");
              }
            } else {
              renderWithErrors();
            }
          });
      }
    })
    .catch((e) => next(e)); */

//=======================================LOGIN FIN===================================================

//===================================================================================

module.exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
}

//==================================DELETE===========================================
module.exports.delete = (req, res, next) => {
  console.log(req, "delete")
  User.findByIdAndRemove(req.user._id)
    .then(user => {
      if (!user) {
        next(console.log( 'User not found'));
      } else {
        res.redirect('/');
      }
    })
    .catch(error => next(error));
}





//=============================PROFILE=============================================================
module.exports.profile = (req, res, next) =>{
  res.render('users/profile')
}

//================================================================================


module.exports.activate = (req, res, next) => {
  User.findOneAndUpdate(
    { activationToken: req.params.token, active: false },
    { active: true, activationToken: "active" }
  )
    .then((u) => {
      if (u) {
        res.render("users/login", {
          user: req.body,
          message:
            "Felicidades, has activado tu cuenta. Ya puedes iniciar sesión",
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((e) => next(e));

    // PRO TIP: PARA EDITAR TEMPLATES DEL CORREO DE ACTIVACION, USAR MJML  !!!!!!!!!!!!!!!!!!!  <--------------
};
//========================NODEMAILER FIN=============================
 
//========================GOOGLE=============================


module.exports.doLoginGoogle = (req, res, next) => {
  passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render('users/login', { error: validations });
    } else {
      req.login(user, loginErr => {
        if (loginErr) next(loginErr)
        else res.redirect('/')
      })
    }
  })(req, res, next)
}
//========================GOOGLE fin============================
