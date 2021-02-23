const mongoose = require("mongoose");
const process = require("process");


//Proceso para conectarnos a la DB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/MountainMadness")
  .then(() => console.info("Successfully connected to the DB"))
  .catch((e) => console.error("Error connecting to the DB", e));



// Desconectamos de DB al parar el server:
process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => console.log("Successfully disconnected from the DB"))
    .catch((e) => console.error("Error disconnecting from the DB", e))
    .finally(() => process.exit());
});
