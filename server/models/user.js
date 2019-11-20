const mongoose = require('mongoose');

// const userCartSchema = new mongoose.Schema({
//     items: Array,
//     totalAmount: Number,
//     totalQuantity: Number
// });

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    imgUrl: String,
    cart: {
        items: Array,
        totalAmount: Number,
        totalQuantity: Number
    }
});

const User = mongoose.model('User', userSchema);

exports.User = User;
