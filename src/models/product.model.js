const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

const ProductModel = mongoose.model("product", schema);

module.exports = {
  ProductModel,
};
