"use strict";

module.exports = (app, express) => {

    //middleware
    require("./middleware")(app, express);

    //database connection
    require("./database");

    // websocket
    require("../src/Event/websocket");
};
