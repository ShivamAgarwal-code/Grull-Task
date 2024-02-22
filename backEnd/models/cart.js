const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: String,
    img: String,
    qty: Number,
    pDate: { type: Date, default: new Date() },
    userName: String
})

module.exports = mongoose.model('cart', cartSchema)