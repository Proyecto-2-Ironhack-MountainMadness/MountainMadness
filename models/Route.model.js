const mongoose = require("mongoose");
const Like = require ("./Like.model")

const routesSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        origin:{
            type: String,
            required: true,
        },
        destinations:{
            type: String,
            required: true,
        },
        distance:{
            type: String,
            required: true,
        },
        time: {
           type: String,
           required: true,
        },
        altitude:{
            type: String,
            required:true,
        },
        latitude:{
            type: String,
            required: true,
        },
        longitude:{
            type: String,
            required:true,
        }
    }
);

const Routes = mongoose.model("Routes", routesSchema);

    module.exports = Routes;


//No se me ocurre mas información para el modelo xDDD