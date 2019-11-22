const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const databaseConfig = require("./database/db");
const users = require("./routes/users");
const products = require("./routes/products");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/angular-shop")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

const app = express();

// app.use(cors());

var corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(express.json({
  type: function (req) {
    return req.headers['content-type'] === '*/*; charset=UTF-8'
  }
}));//req.body (built-in Middleware)
// app.use(express.json());//req.body (built-in Middleware)
app.use(express.urlencoded({ extended: true })); //key=value&key=value (built-in Middleware)

// app.use(bodyParser.json());
// app.use(bodyParser.json({
//   type: function (req) {
//     return req.headers['content-type'] === '*/*; charset=UTF-8'
//   }
// }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ type: 'application/*+json' }));

// app.use(bodyParser.json({
//   type: function (req) {
//     return req.headers['content-type'] === '*/*'
//   }
// }));

app.use("/api/user", users);
app.use("/api/products", products);

let port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log("Listening on port " + port);
});
