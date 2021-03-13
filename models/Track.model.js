const mongoose = require("mongoose");
const categories = require("../data/categories");
const dificultad = require("../data/dificultad");
const valoracion = require("../data/valoracion");
const Like = require("./Like.model")

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    categories: {
      type: String,
      enum: categories,
    },
    valoracion: {
      type: String,
      enum: valoracion,
    },
    dificultad: {
      type: String,
      enum: dificultad,
    },
    distance: {
      type: Number,
    },
    path: {
      type: [[Number]],
    },
  
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
},

  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
  }
);

// location: {
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// },

trackSchema.index({ location: "2dsphere" });

trackSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "track",
});
/* trackSchema.virtual("valoracion", {
  ref: "valoracion",
  localField: "_id",
  foreignField: "track",
});
trackSchema.virtual("dificultad", {
  ref: "dificultad",
  localField: "_id",
  foreignField: "track",
}); */

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;

//No se me ocurre mas información para el modelo xDDD
