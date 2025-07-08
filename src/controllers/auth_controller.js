const { ShippingAddressModel } = require("../models/shippingAddress.model");
const { UserModel } = require("../models/user.model");
const { generateJWTtoken } = require("../utils/generateTokent");

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      message: "username or password required",
      success: false,
    });
  }
  try {
    const user = await UserModel.findOne({ username, password }).select(
      "-password -__v -token"
    );
    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found", success: false });
    }
    console.log(user);
    const token = generateJWTtoken({ _id: user._id, username: user.username });
    user.token = token;
    // await user.updateOne({ _id: user._id }, { token });
    await user.save();
    res.send({
      message: "login successfully",
      token,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.toString(),
      success: false,
    });
  }
};

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = { username, password, email };
    const isUserPresent = await UserModel.findOne({ email, username });
    console.log(isUserPresent);
    if (isUserPresent) {
      return res.send({ message: "user already exists", success: false });
    }
    const createdUser = await UserModel.insertOne(user);
    res.send({
      message: "user created successfully",
      data: createdUser,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.toString(), success: false });
  }
};

const createAddress = async (req, res) => {
  try {
    const { _id, body } = req;
    if (!_id || body == undefined) {
      return res
        .status(400)
        .send({ message: "something went wrong", success: false });
    }

    const { name, street, city, pincode, mobileNumber } = body;
    const required = ["name", "street", "city", "pincode", "mobileNumber"];

    if ((!name || !street, !city, !pincode, !mobileNumber)) {
      return res
        .status(400)
        .send({ message: "something went wrong", success: false });
    }

    const doc = await ShippingAddressModel.create({ ...req.body, userId: _id });
    await doc.save();
    res
      .status(201)
      .send({ message: "shipping address created", success: true, data: doc });
    // const address = await ShippingAddressModel.insertOne();
  } catch (error) {
    res.status(400).send({ message: err.toString(), success: false });
  }
};

module.exports = {
  userLogin,
  registerUser,
  createAddress,
};
