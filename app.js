// app.js

const express = require('express');
const bodyParser = require('body-parser');
const configValues = require('./config-values')

// initialize our express app
const app = express();

const configRoute = require('./routes/config'); // Imports routes
const tradeRoute = require('./routes/trade'); // Imports routes
const cors = require('cors');

app.use('/api', configRoute);
app.use('/api', tradeRoute);

app.use(cors());
app.options('*', cors());

///let port = normalizePort(process.env.PORT || 1234);
let port =configValues.port;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});