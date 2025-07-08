const express = require("express");
require("dotenv").config();
const userRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/product.routes");
const orderRoutes = require("./src/routes/order.routes");
const mongoose = require("mongoose");
const cors = require("cors");

//  initialize app
const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

let connection = null;

async function makeConnection() {
  if (!connection) {
    connection = await mongoose.connect(uri);
    return connection;
  } else {
    return connection;
  }
}

app.use(async (_, res, next) => {
  try {
    console.log("connection hiited");
    await makeConnection();
    next();
  } catch (error) {
    throw error;
  }
});

// server listener
const portNo = process.env.PORT_NO || 3000;
//  user routes
app.use("/api/product", productRoutes.route);
app.use("/api/auth", userRoutes.routes);
app.use("/api/order", orderRoutes.routes);

app.listen(portNo, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`http://localhost:${portNo}`);
});
