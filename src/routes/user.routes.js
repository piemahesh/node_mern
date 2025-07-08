const express = require("express");
const {
  userLogin,
  registerUser,
  createAddress,
} = require("../controllers/auth_controller");
const { verifyToken } = require("../middleware/authMiddleware");

// const {authMiddleware, userCreationMiddleware } = require('../utils/myMiddleware')
// user controller

const routes = express().router;

routes.post("/login", userLogin);

routes.post("/register", registerUser);

routes.post("/address/create", verifyToken, createAddress);

/*
 * this is the normal get api which give the hi
 *
 */
// routes.post('/create', makeProduct)

//

module.exports = { routes };
