"use strict";
require("dotenv").config({});
const debug = require("debug")("app:debug");
let express = require("express");
require("express-async-errors");


let app = express();

const createError = require("http-errors");
require("./startups")(app, express);


global.isProduction = process.env.NODE_ENV == "production";
global.isDevelopment = process.env.NODE_ENV == "development";
global.isStaging = process.env.NODE_ENV == "staging";


//routes
require("./routes")(app);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    return next(createError(404));
});


// error handler
app.use((err, req, res) => {
    debug("Error", err);
    logger(err.message, (new Error(err)).stack, {
        status: err.status,
        url: req.url
    });
    res.status(err.status || 500).json({ error: err.message });
});


module.exports = app;
