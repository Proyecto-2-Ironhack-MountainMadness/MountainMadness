const mongoose = require("mongoose");
const Route = require("./route.model");
const User = require("./User.model")

const likeSchema = new mongoose.Schema(
    {
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
          required: true,
        },
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Routes",
          required: true,
        },
      },
      //Mas adelante tendremos que hacer un populate...
    //   {
    //     timestamps: true,
    //     toJSON: {
    //       virtuals: true,
    //     },
    //   }
    );

    const Like = mongoose.model("Like", likeSchema);

    module.exports = Like;


    //Está sin acabar, se explica en la segunda mitad en el video de la clase del día 10/02.
    