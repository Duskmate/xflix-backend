const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const helmet = require("helmet");

const mongoose = require("mongoose");
const config = require("./config/config");
mongoose.connect(config.mongoose.url).then(() => {
    console.log("Connected to MongoDB");
})

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    throw new Error(httpStatus.NOT_FOUND, "Not found");
});

module.exports = app;