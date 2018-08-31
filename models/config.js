'use strict'

// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var ConfigSchema = Schema({
    id: Number,
    name: String,
    description: String,
    value: Number,
    type: String,
    href: String
});

var Config = mongoose.model('Config', ConfigSchema);

module.exports = {
    ConfigModel: Config
   };