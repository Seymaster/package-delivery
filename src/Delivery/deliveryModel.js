const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const deliverySchema = new mongoose.Schema({
  delivery_id: {
    type: String,
    required: true,
    unique: true
  },
  package_id: {
    type: String,
    required: true
  },
  pickup_time: {
    type: Date,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
    required: false,
    default: 'open'
  }
});

deliverySchema.plugin(mongoosePaginate);
const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;