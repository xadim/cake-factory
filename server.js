// require('dotenv').config()

var bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config({ path: __dirname + "/.env" });

console.log("cakefactory. running..");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const user = process.env.DB_USER;
const password = process.env.DB_PASS;

mongoose.connect(
  "mongodb+srv://" +
    user +
    ":" +
    password +
    "@cake-api.p5epn.mongodb.net/cake-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(
  bodyParser.json({ limit: "5mb", extended: true, parameterLimit: 50000 })
);
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const cakesRouter = require("./routes/cakes");
app.use("/cakes", cakesRouter);

app.listen(process.env.PORT || 5000);
