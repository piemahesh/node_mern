const { ProductModel } = require("../models/product.model");
const { makeUser } = require("../models/user.model");

function getUsers(req, res) {}

const getAllUsers = (req, res) => {
  try {
    const { data } = req;
    console.log(data, ".....");
    const newUser = makeUser(data);
    res.send({ message: "hello", user: newUser });
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

module.exports = {
  getUsers,
  getAllUsers,
};
