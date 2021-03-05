const mongoose = require("mongoose");
const categories = require('../data/categories');
// const Like = require("./Like.model")

const trackSchema = new mongoose.Schema({
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
    
  }

  // tags: [String],

  //     origin: {
  //         type: String,
  //         required: true,
  //     },
  //     destinations: { Waypoints
  //         type: String,
  //         required: true,
  //     },
  //     distance: {
  //         type: String,
  //         required: true,
  //     },
  //     time: {
  //         type: String,
  //         required: true,
  //     },
  //     altitude: {
  //         type: String,
  //         required: true,
  //     },
  //     latitude: {
  //         type: String,
  //         required: true,
  //     },
  //     longitude: {
  //         type: String,
  //         required: true,
  //     },
});


const Track = mongoose.model("Track", trackSchema);

module.exports = Track;


//No se me ocurre mas información para el modelo xDDD