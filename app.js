//Dotenv es un módulo de dependencia cero que carga variables de entorno desde un .envarchivo a process.env.
require('dotenv').config();

//El módulo de errores HTTP se utiliza para generar errores para las aplicaciones Node.js. 
const createError = require("http-errors");

//Requerimos el modulo express para utilizar sus funciones y variables
const express = require('express');

//Middleware que nos da más info en los logs de consola
const logger = require('morgan');

//Motor de vistas que utilizamos
const hbs = require('hbs');
//Requerimos session connfig para configurar las sesiones de usuario
const session = require('./config/session.config')


//Requerimos routes para configurar todas nuestras rutas en un archivo
const routes = require("./config/routes");
const sessionMiddleware = require('./middlewares/session.middleware')

//Requerimos la instancia db.config donde está la configuración de la base de datos
require('./config/db.config')



//=================Configuracion de Express=========================

//Configuramos la instacia de express
const app = express();

//Middleware para solicitudes POST que envía datos al servidor y le pide que acepte o almacene esos datos (objeto),
//que están incluidos en el cuerpo (es decir, req.body) de esa solicitud (POST) 
// ¡¡¡CONFLICTO SI USAMOS BODY PARSER PORQUE YA VIENE IMPLICITO!!!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Configuramos carpeta public con express para poder usar css e imagenes en nuestras views
app.use(express.static("public"));
//Middleware para las cookies
app.use(session)

//Middleware para poder meter logs en consola
app.use(logger("dev"));

//Configuramos la ruta que contiene la vistas
app.set("views", __dirname + "/views");

//Configuramos el motor de vistas que vamos a utilizar
app.set("view engine", "hbs");

//Registramos los partials
hbs.registerPartials(__dirname + "/views/partials");


//===========================Middleware===========================================
app.use(sessionMiddleware.findUser)

//======================================================================

//Seteamos el / para poder utilizar las rutas
app.use("/", routes);





// Error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((error, req, res, next) => {
  console.log(error);
  if (!error.status) {
    error = createError(500);
  }
  res.status(error.status);
  res.render("error", error);
});


//=================Configuración inicialización=========================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
