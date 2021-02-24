const expressSession = require('express-session')
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')
const MongoStore = connectMongo(expressSession)


const session = expressSession({
  secret: process.env.SESSION_SECRET || 'super secret',
  saveUninitialized: false,
  resave: false,
  cookie:{
      secure: process.env.SESSION_SECURE || false,  //true cuando despleguemos en Heroku
      httpOnly: true,
      maxAge: process.env.SESSION_MAX_AGE || 3600000 //La cookie dura una hora
  },
  store: new MongoStore ({
      mongooseConnection : mongoose.connection,
      ttl: process.env.SESSION_MAX_AGE || 3600000
  })
})


module.exports = session