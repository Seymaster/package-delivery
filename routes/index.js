"use strict";
const packageRoutes = require("./package");


module.exports = (app) => {
    app.use("/v1/package", packageRoutes);
};
