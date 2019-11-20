const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imgs: Array,
    video: String,
    colour: String,
    rating: Number,
    productType: String,
    price: {
        value: String,
        ISO: String,
        currency: String,
        message: String
    },
    stock: {
        status: Boolean,
        message: String
    }
});

const Prouduct = mongoose.model('Product', productSchema);

exports.Prouduct = Prouduct;