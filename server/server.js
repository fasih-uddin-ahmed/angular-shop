const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const databaseConfig = require("./database/db");
const users = require('./routes/users');
const products = require('./routes/products');

mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost/angular-shop')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", users);
app.use("/api/products", products);

let port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log("Listening on port " + port);
});