const mongoose = require("mongoose");
// const Like = require("./Like.model")

const routeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        
        author: {
            type: String,
            required: true,

        },
        image: {
            type: String,
            validate: {
                validator: (text) => {
                    return text.startsWith("http");
                },
                message: "URL start with HTTP/HTTPS"
            },
        },

        tags: [String],

    //     origin: {
    //         type: String,
    //         required: true,
    //     },
    //     destinations: {
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
        
    }
);

const Route = mongoose.model("Routes", routeSchema);

module.exports = Route;


//No se me ocurre mas información para el modelo xDDD