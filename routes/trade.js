var express = require('express');
var api = express.Router();
//const auth = require('../middlewares/authenticated')
var TradeController = require('../controllers/trade');

// a simple test url to check that all of our files are communicating correctly.
// api.get('/test', ConfigController.test);
// api.get('/trade/getByWeek/:date', TradeController.getByWeek);
// api.get('/trade/getByYear/:year', TradeController.getByYear);
api.get('/trades/', TradeController.getFilter);
//api.get('/trade/', TradeController.getAll);


module.exports = api;