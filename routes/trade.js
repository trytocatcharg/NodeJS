var express = require('express');
var api = express.Router();
//const auth = require('../middlewares/authenticated')
var TradeController = require('../controllers/trade');

// a simple test url to check that all of our files are communicating correctly.
// api.get('/test', ConfigController.test);
api.get('/trade/getByWeek/:date', TradeController.getByWeek);

module.exports = api;