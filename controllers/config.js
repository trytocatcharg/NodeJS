

'use strict'

var Config = require('../models/config');
const configValues = require('../config-values')
const MongoClient = require('mongodb').MongoClient;
const url = configValues.db;

exports.getList= function(req,res){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("trading_db");
    dbo.collection("config").find({}).toArray(function(err, result) {
        console.log(result);
        if (!result) return res.status(404).send({message: 'not found'})
        if (err) throw err;
        db.close();

        console.log(result);

        result.forEach(element => {
            element.href="/config/"+ element.id;    
        });
        
        res.status(200).send(result);
    });
  });
}

exports.getFilter=function(req,res){
    var nameParam = String(req.params.param);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("trading_db");
        var filter={name:nameParam.toUpperCase()};
        if(!isNaN(Number(nameParam))){
            filter={id:Number(nameParam)};
        }
      
        dbo.collection("config").find(filter).toArray(function(err, result) {
            if (!result) return res.status(404).send({message: 'not found'})
            if (err) throw err;
            db.close();

            result[0].href="/config/"+ result[0].id;
            console.log(result);
            res.status(200).send(result);
        });
    });

}



// //Simple version, without validation or sanitation
// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

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