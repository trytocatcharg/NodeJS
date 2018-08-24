'use strict'

// Cargamos los modelos para usarlos posteriormente
var Config = require('../models/config');


exports.getList= function(req,res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://tradingUser:MELIZZA.2011@ds125272.mlab.com:25272/trading_db";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("trading_db");
    dbo.collection("config").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.send(result);
    });
    });
}



//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// // Conseguir datos de un usuario

// function getConfig(req, res){
//     var id = req.params.id;

// //buscar un documento por un  id
//     Config.findById(id, (err, user) => {
//         if(err)return res.status(500).send({message: 'Error en la petición'});

// if(!user) return res.status(404).send({message: 'EL usuario no existe'});

// followThisUser(req.user.sub, id).then((value) => {
//             user.password = undefined;
//             return res.status(200).send({
//                 user,
//                 following: value.following,
//                 followed: value.followed
//             });
//         });
        
//     });
// }