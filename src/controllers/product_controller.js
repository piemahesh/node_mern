const { ProductModel } = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send({
      data: products,
      message: "product fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

//  getProduct by id
const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await ProductModel.findOne({ _id: id });

    res.send({
      message: "product get successfully",
      data: product,
      success: true,
    });
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

const makeProduct = async (req, res) => {
  const body = req.body;
  console.log(body);
  const { name, amount } = req.body;
  try {
    const data = await ProductModel.insertOne({
      name,
      amount,
    });
    res.send({ data });
  } catch (error) {
    res.send({ message: error.toString() });
  }
};

const makeMultipleProducts = async (req, res) => {
  const { products } = req.body;
  let isArray = Array.isArray(products);
  if (!isArray || products.length == 0) {
    return res
      .status(404)
      .send({ message: "product should be array of data", success: false });
  }
  console.log(isArray);
  try {
    const data = await ProductModel.insertMany(products);
    console.table(data);
    res.send({ message: "products created successfully", success: true });
  } catch (error) {
    res.send({ message: error, success: false });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { deletedCount } = await ProductModel.deleteOne({ _id: id });
    if (deletedCount == 0) {
      return res.send({ message: "product not found", success: false });
    }

    res.send({
      message: "product deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

//  update product by Id
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;
  try {
    const product = await ProductModel.updateOne({ _id: id }, { name, amount });
    console.log(product);
    res.send({
      message: "product updated successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { productIds } = req.body;
    const data = await ProductModel.find({ _id: { $in: productIds } });
    return res.send({
      data,
      success: true,
      message: "data fetched successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.toString(), success: false });
  }
};

module.exports = {
  makeProduct,
  makeMultipleProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProductDetails,
};
