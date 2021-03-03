const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require ('../models/User.model')
const mongoose = require('mongoose')

passport.serializeUser((user,next) => {
    next(null, user.id)

})

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then((user) => {
            next(null, user)

        })
        .catch(next)
})

passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          next(null, false, { error: "El correo electrónico o la contraseña no son correctos" })
        } else {
          return user.checkPassword(password)
            .then(match => {
              if (match) {
                if (user.active) { 
                  next(null, user)
                } else {
                  next(null, false, { error: "Tu cuenta no está activa, mira tu email" })
                }
              } else {
                next(null, false, { error: "El correo electrónico o la contraseña no son correctos" })
              }
            })
        }
      })
      .catch(next)
  }))

  passport.use('google-auth', new GoogleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_REDIRECT_URI || '/authenticate/google/cb'
  }, (accessToken, refreshToken, profile, next) => {
    const googleID = profile.id
    const email = profile.emails[0] ? profile.emails[0].value : undefined;
    const imgProfile = profile.photos[0].value
  
    if (googleID && email) {
      User.findOne({ $or: [
        { email: email },
        { 'social.google': googleID }
      ]})
      .then(user => {
            /* next(null, false, { error: "Registrate y activa tu cuenta aceptando el correo de confirmacion" }) */
            if (!user) {
                const newUserInstance = new User({
                  email,
                  imgProfile,
                  password: 'Aa1' + mongoose.Types.ObjectId(),
                  social: {
                    google: googleID
                  },
                  active: true
                })
        
                return newUserInstance.save()
                  .then(newUser => next(null, newUser))
        } else {
          next(null, user)
        }
      })
      .catch(next)
    } else {
      next(null, null, { error: 'Error conectando con Google OAuth' })
    }
  }))

  