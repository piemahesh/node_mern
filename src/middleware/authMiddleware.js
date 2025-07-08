const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(404)
      .send({ message: "please provide authorization header" });
  }
  const { authorization } = req.headers;
  const authorizationList = authorization.split(" ");
  const isBearer = authorizationList[0].startsWith("Bearer");
  const token = authorizationList[1];
  if (!isBearer || !token) {
    return res.status(401).send({ message: "please give the token" });
  }
  try {
    console.log(process.env.JWT_SECRET);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("-----------------------------------------------------");
    console.log(user);
    const isValidToken = await UserModel.findOne({ _id: user._id, token });
    console.log(isValidToken);
    if (!isValidToken) {
      return res.send({ message: "token is mismatched" });
    }
    console.log(user.id, "------------------------------------");
    req._id = user._id;
    next();
  } catch (error) {
    res.status(401).send({ message: "token was expired" });
  }
}

module.exports = {
  verifyToken,
};
