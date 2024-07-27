"use strict";

const Package = require("./packageModel");
const Repository = require("../MongoDBRepository");

class PackageRepository extends Repository {
    constructor() {
        super(Package);
    }

}
module.exports = (new PackageRepository());