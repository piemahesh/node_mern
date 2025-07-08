const mongoose = require("mongoose");

const ShipmentAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

const ShippingAddressModel = mongoose.model(
  "shippingAddress",
  ShipmentAddressSchema
);

module.exports = {
  ShippingAddressModel,
};
