"use strict";

const Delivery = require("./deliveryModel");
const Repository = require("../MongoDBRepository");

class DeliveryRepository extends Repository {
    constructor() {
        super(Delivery);
    }

}
module.exports = (new DeliveryRepository());