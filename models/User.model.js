//Requerimos mongoose para poder enlazar la DB
const mongoose = require("mongoose");

//bcrypt es una función de hash de contraseñas
const bcrypt = require ("bcrypt");

//Caracteres admitidos en email y contraseña
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

//Nº de veces que algoritmo cifra la contraseña 
const SALT_ROUNDS = 10;

const Like = require("./Like.model")


//============Schema que guardamos en const e importamos de mongoose===================

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Es necesario añadir un correo electrónico",
    unique: true,
    lowercase: true,
    //Requisitos para que un email se válido
    match: [EMAIL_PATTERN, "Email inválido"],
    trim: true,
  },
  password: {
    type: String,
    required: "La contraseña es requerida",
    match: [
      PASSWORD_PATTERN,
      "Tu contraseña debe contener al menos 1 número, 1 mayúscula, 1 minúscula y 8 caracteres",
    ],
  },
  nickName: {
    type: String
  },
  imgProfile: {
    type: String,
    default: "https://res.cloudinary.com/drls3a8oi/image/upload/v1615552272/IRON%20HACK/MountainMadness/default_h7xjby.jpg",
  },
  birth: {
    type: Date
  },
  aboutMe: {
    type: String
  },
  country: {
    type: String
  },
  phone: {
    type: Number
  },
  //=======================nodemailer===================
  active: {
    type: Boolean,
    default: false,
  },
  /* role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
      }, */
  social: {
    google: String,
    /* feisbuk: String */
  },
  //======================nodemailer====================
  activationToken: {
    type: String,
    default: () => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    },
  },
}, {
  toJSON: { virtuals: true }
});
    

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.virtual("tracks", {
  ref: "Track",
  foreignField: "author",
  localField: "_id",
  
})

userSchema.pre("save", function (next) {
    /* if (this.email === process.env.ADMIN_EMAIL) {
      this.role = 'ADMIN'
    } */
  
    if (this.isModified("password")) {
      bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
        this.password = hash;
        next();
      });
    } else {
      next();
    }
  });

  userSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'user'
  });

//======================exportamos el schema del modelo=========================

const User = mongoose.model("User", userSchema);
module.exports = User;