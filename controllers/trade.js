

'use strict'

var trade = require('../models/trade');
const configValues = require('../config-values')
const MongoClient = require('mongodb').MongoClient;
const url = configValues.db;
const common = require('../common/appCommon')
var moment = require('moment');


exports.getByWeek=function(req,res){
    /*The way to avoid issues of that sort is to include the strict mode Boolean argument in the constructor invocation. A value of true specifies that the format and input must match exactly, including delimiters:
    moment('2016 is a date', 'YYYY-MM-DD', true);  //no longer valid!*/
    var isValid=moment(String(req.params.date), "YYYY-MM-DD",true).isValid();
    if (!isValid){
        return res.status(500).send({message: 'internal error'})
    }   
    var date = Date.parse(req.params.date);
    var year=parseInt(moment(req.params.date).format("YYYY")); 
    var marketType = String(req.params.type); //que tipo de mercado esta consultando... si viene vacio es todos
    var numberOfWeek=common.getWeekNumber(date);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("trading_db");
        var filter = {weekOfYear:numberOfWeek, year:year};
        
        if (typeof(marketTyp) != "undefined"){
            //si no viene nada traigo sin filtrar por el tipo de mercado
            filter = {weekOfYear:numberOfWeek, year:year,type:marketType.toUpperCase()};
        }

        console.log(filter);
        dbo.collection("Trades").find(filter).toArray(function(err, result) {
            console.log(result);
            if (!result) return res.status(404).send({message: 'not found'})
            if (err) throw err;
            db.close();
            res.status(200).send(result);
        });
    });
}
