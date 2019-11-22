const mongoose = require('mongoose');
const express = require('express');
const { Product } = require('../models/product');
const router = express.Router();


router.get('/', async (req, res) => {
    let products = await Product.find();
    if (!products) return res.status(400).send('No products in Database.');

    res.send(products);
});

router.post('/product', async (req, res) => {
    console.log(req.body);
    let product = await Product.findOne({ id: req.body.id });
    if (!product) return res.status(400).send('No product in Database.');

    res.send(product);
});

router.post('/', async (req, res) => {
    let product = await Product.findOne({ id: req.body.id });
    if (product) return res.status(400).send('product already registered.');

    product = new Product({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        imgs: req.body.imgs,
        video: req.body.video,
        colour: req.body.colour,
        rating: req.body.rating,
        productType: req.body.productType,
        price: {
            value: req.body.price.value,
            ISO: req.body.price.ISO,
            currency: req.body.price.currency,
            message: req.body.price.message
        },
        stock: {
            status: req.body.stock.status,
            message: req.body.stock.message
        }
    });

    await product.save();
});

module.exports = router;