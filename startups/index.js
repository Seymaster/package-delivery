"use strict";

module.exports = (app, express) => {

    //middleware
    require("./middleware")(app, express);

    //database connection
    require("./database");
};
