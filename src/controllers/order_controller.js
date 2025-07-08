const { default: mongoose } = require("mongoose");
const { OrderModel } = require("../models/order.model");
const { ShippingAddressModel } = require("../models/shippingAddress.model");

const createOrder = async (req, res) => {
  try {
    const { _id, body } = req;
    if (!_id || body == undefined) {
      return res
        .status(400)
        .send({ message: "something went wrong", success: false });
    }

    const address = await ShippingAddressModel.findOne({ userId: _id });
    if (!address) {
      return res
        .status(400)
        .send({ message: "Please provide the address", success: false });
    }
    console.log(address);

    const shippmentId = address._id;
    const { carts } = body;
    if (!carts) {
      return res
        .status(400)
        .send({ message: "Please select any product", success: false });
    }
    const products = carts.map((d) => {
      return { productId: d._id, quantity: d.quantity, price: d.price };
    });

    const data = await OrderModel.create({
      userId: _id,
      shippmentId,
      products,
    });

    res.status(200).send({ message: _id, success: true, data });
  } catch (err) {
    res.status(400).send({ message: err.toString(), success: false });
  }
};

const getOrders = async (req, res) => {
  try {
    const { _id } = req;

    const data = await OrderModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "shippingaddresses",
          localField: "shippmentId",
          foreignField: "_id",
          as: "shippmentDetails",
        },
      },
      {
        $unwind: "$shippmentDetails",
      },

      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products", // name of the ProductModel collection
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },

      {
        $addFields: {
          "products.name": "$productDetails.name",
          "products.discount": "$productDetails.discount",
          "products.description": "$productDetails.discription",
          "products.image": "$productDetails.image",
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          shippmentId: { $first: "$shippmentId" },
          orderId: { $first: "$orderId" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: { $push: "$products" },
          shippmentDetails: { $first: "$shippmentDetails" },
        },
      },
    ]);
    // const data = await OrderModel.find({ userId: _id });
    res.status(200).send({
      data,
      message: "orders get successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({ message: error.toString(), success: false });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
