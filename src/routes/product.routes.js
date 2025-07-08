const express = require("express");
const {
  makeProduct,
  makeMultipleProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProductDetails,
} = require("../controllers/product_controller");
const { verifyToken } = require("../middleware/authMiddleware");
const route = express().router;

// get all product
route.get("/get-all", verifyToken, getAllProducts);
// get specific product by id
route.get("/get/:id", getProductById);
// single product add
route.post("/create", makeProduct);
//  multiple products add
route.post("/create-multiple", verifyToken, makeMultipleProducts);
// delete specfic product by id
route.delete("/delete/:id", deleteProductById);

//  get the cart details
route.post("/get-cart/details", getProductDetails);

//  update product by id

route.patch("/update/:id", updateProductById);
module.exports = {
  route,
};
