const mongoose = require("mongoose");
const Track = require("./Track.model");
const User = require("./User.model");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    track: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Track",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;

