const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    desc:String,
    category:String,
    price:Number,
    img:String,
    status:{type:String,default:'IN-STOCK'},
    qty:Number,
})

module.exports = mongoose.model('product', productSchema)