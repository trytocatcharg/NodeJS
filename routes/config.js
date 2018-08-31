var express = require('express');
var api = express.Router();
//const auth = require('../middlewares/authenticated')
var ConfigController = require('../controllers/config');

// a simple test url to check that all of our files are communicating correctly.
// api.get('/test', ConfigController.test);
api.get('/config', ConfigController.getList);
api.get('/config/:param', ConfigController.getFilter);

module.exports = api;