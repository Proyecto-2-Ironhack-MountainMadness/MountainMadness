const mongoose = require("mongoose");
// const Like = require("./Like.model")

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
            type: String,
            required: false,

        },
         image: {
             type: String,
            /*  validate: {
                 validator: (text) => {
                     return text.startsWith("http");
                 },
                 message: "URL start with HTTP/HTTPS"
             }, */
         },

        // tags: [String],

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

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;


//No se me ocurre mas información para el modelo xDDD