"use strict";
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    package_id: { type: String, required: true, unique: true, default: uuidv4() },
    active_delivery_id: { type: String, required: false },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    deletedAt: { type: Number, default: null }
});

packageSchema.plugin(mongoosePaginate);
const Package = mongoose.model("Package", packageSchema);

module.exports = Package;


