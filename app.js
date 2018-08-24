// app.js

const express = require('express');
const bodyParser = require('body-parser');

// initialize our express app
const app = express();

const configRoute = require('./routes/config'); // Imports routes
app.use('/api', configRoute);

///let port = normalizePort(process.env.PORT || 1234);
let port = process.env.PORT;
if (process.env.PORT==undefined) {
    port=1234;
}

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});