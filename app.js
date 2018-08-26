// app.js

const express = require('express');
const bodyParser = require('body-parser');
const configValues = require('./config-values')

// initialize our express app
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


const configRoute = require('./routes/config'); // Imports routes
const tradeRoute = require('./routes/trade'); // Imports routes
app.use('/api', configRoute);
app.use('/api', tradeRoute);
app.use(allowCrossDomain);

///let port = normalizePort(process.env.PORT || 1234);
let port =configValues.port;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});