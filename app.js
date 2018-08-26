// app.js

const express = require('express');
const bodyParser = require('body-parser');
const configValues = require('./config-values')

// initialize our express app
const app = express();
const mongoose = require('mongoose');
const configRoute = require('./routes/config'); // Imports routes
const tradeRoute = require('./routes/trade'); // Imports routes
const cors = require('cors');

app.use(cors()); //https://github.com/expressjs/cors
app.use('/api', configRoute);
app.use('/api', tradeRoute);


mongoose.connect(configValues.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')
});



///let port = normalizePort(process.env.PORT || 1234);
let port =configValues.port;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});