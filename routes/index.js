"use strict";
const deliveryRoutes = require("./delivery");
const packageRoutes = require("./package");


module.exports = (app) => {
    app.use("/v1/package", packageRoutes);
    app.use("/v1/delivery", deliveryRoutes);
};
