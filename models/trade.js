'use strict'

// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var TradeSchema = Schema({
    weekOfYear:     Number,
    type:           String,
    dateTrade:      Date,
    timeIn:         String,
    timeOut:        String,
    priceIn:        Number,
    priceOut:       Number,
    stopLoss:       Number,
    stopProfit:     Number,
    operation_type: String,
    year:           Number
});

module.exports = mongoose.model('Trades', TradeSchema);