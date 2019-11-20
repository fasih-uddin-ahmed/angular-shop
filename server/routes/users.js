// const auth = require('../middlewares/auth');
// const bcrypt = require('bcrypt');
// const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/me', async (req, res) => {
//     const user = await User.findById(req.user._id);
//     res.send(user);
// });

router.get('/user', async (req, res) => {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password.');

    res.send(user);
});

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // user = new User(_.pick(req.body, ['name', 'email', 'password']));

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        imgUrl: req.body.imgUrl,
        cart: {
            items: req.body.cart.items,
            totalAmount: req.body.cart.totalAmount,
            totalQuantity: req.body.cart.totalQuantity
        }
    });

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // const token = user.generateAuthToken();
    // res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));

    /* res.send({
        name: user.name,
        email: user.email
    }); */
})

module.exports = router;