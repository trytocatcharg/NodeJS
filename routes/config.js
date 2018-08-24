var express = require('express');
var api = express.Router();

var ConfigController = require('../controllers/config');

// a simple test url to check that all of our files are communicating correctly.
api.get('/test', ConfigController.test);

api.get('/config/list', ConfigController.getList);

module.exports = api;