

'use strict'

var Trade = require('../models/trade');
const configValues = require('../config-values')
const MongoClient = require('mongodb').MongoClient;
const url = configValues.db;
const common = require('../common/appCommon')
var moment = require('moment');
const database="trading_db";

//Trae todos los registros de Trades
// exports.getAll=function(req,res){
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(database);
//            dbo.collection("Trades").find().toArray(function(err, result) {
//             console.log(result);
//             if (!result) return res.status(500).send({message: 'internal error'})
//             if (err) throw err;
//             db.close();
            
//             res.status(200).send(result);
//         });
//     });
// }

exports.getFilter=function(req,res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        var filter = {};
       console.log("parametro date",req.query.date);
       console.log("parametro year",req.query.year);
       var marketType = req.query.type; //que tipo de mercado esta consultando... si viene vacio es todos
       console.log("parametro type",marketType);

        if(req.query.date){
            var isValid=moment(String(req.query.date), "YYYY-MM-DD",true).isValid();
            if (!isValid){
                return res.status(500).send({message: 'internal error'})
            }   
            var date = Date.parse(req.query.date);
            var year=parseInt(moment(req.query.date).format("YYYY")); 
            
            var numberOfWeek=common.getWeekNumber(date);
            var filter = {weekOfYear:numberOfWeek, year:year};
            
            filter = {weekOfYear:numberOfWeek, year:year};
        }else{
            
        if(req.query.year){
            var year =parseInt(req.query.year);
            filter = {year:year};
            }
        }

        if (typeof(marketType) != "undefined"){
            //si no viene nada traigo sin filtrar por el tipo de mercado
            if(marketType != ''){
                filter.type=marketType.toUpperCase();
            }
        }

    console.log("Se va a filtrar por: ",filter);
        dbo.collection("Trades").find(filter).toArray(function(err, result) {
            console.log(result);
            if (!result) return res.status(404).send({message: 'not found'})
            if (err) throw err;
            db.close();
            res.status(200).send(result);
        });
    
    });
}
// https://mongodb.github.io/node-mongodb-native/2.0/tutorials/aggregation/
exports.getMarkets=function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
   
        var dbo = db.db(database);
        dbo.collection("Trades").aggregate(
            [
                {"$match": {}},
                { "$group": {
                    "_id": "$type",
                    "count": { "$sum": 1 }
                }}
            ]).toArray(function(err, docs) {
            if (err) console.log("err",err);
            if (!docs) return res.status(404).send({message: 'not found'})

            console.log("docs", docs);
            db.close();
            res.status(200).send(docs);
          });
    });
}
// exports.getByYear=function(req,res){
//     var year =parseInt(req.params.year);
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(database);
//         var filter = {year:year};
    
//         Trade.find(filter,function(err, result) {
//             console.log(result);
//             if (!result) return res.status(404).send({message: 'not found'})
//             if (err) throw err;
//             db.close();
//             res.status(200).send(result);
//         });
    
//         // console.log(filter);
//         // dbo.collection("Trades").find(filter).toArray(function(err, result) {
//         //     console.log(result);
//         //     if (!result) return res.status(404).send({message: 'not found'})
//         //     if (err) throw err;
//         //     db.close();
//         //     res.status(200).send(result);
//         // });
//     });
// }

// //Trae resultados de la semana. Se le envia una fecha calcula que semana es y devuelve resultados
// exports.getByWeek=function(req,res){
//     /*The way to avoid issues of that sort is to include the strict mode Boolean argument in the constructor invocation. A value of true specifies that the format and input must match exactly, including delimiters:
//     moment('2016 is a date', 'YYYY-MM-DD', true);  //no longer valid!*/
//     var isValid=moment(String(req.params.date), "YYYY-MM-DD",true).isValid();
//     if (!isValid){
//         return res.status(500).send({message: 'internal error'})
//     }   
//     var date = Date.parse(req.params.date);
//     var year=parseInt(moment(req.params.date).format("YYYY")); 
//     var marketType = String(req.params.type); //que tipo de mercado esta consultando... si viene vacio es todos
//     var numberOfWeek=common.getWeekNumber(date);

//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(database);
//         var filter = {weekOfYear:numberOfWeek, year:year};
        
//         if (typeof(marketTyp) != "undefined"){
//             //si no viene nada traigo sin filtrar por el tipo de mercado
//             filter = {weekOfYear:numberOfWeek, year:year,type:marketType.toUpperCase()};
//         }

//         console.log(filter);
//         dbo.collection("Trades").find(filter).toArray(function(err, result) {
//             console.log(result);
//             if (!result) return res.status(404).send({message: 'not found'})
//             if (err) throw err;
//             db.close();
//             res.status(200).send(result);
//         });
//     });
// }
