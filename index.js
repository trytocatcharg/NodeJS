// https://medium.com/williambastidasblog/estructura-de-una-api-rest-con-nodejs-express-y-mongodb-cdd97637b18b

// Utilizar funcionalidades del Ecmascript 6
'use strict'

// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');

// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var port = 3800;

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;

// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect('mongodb://tradingUser:MELIZZA.2011@ds125272.mlab.com:25272/trading_db',  { useMongoClient: true})
    .then(() => {

        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos se ha realizado correctamente")
    
        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(port, () => {
            console.log("servidor corriendo en http://localhost:3800");
        });
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));