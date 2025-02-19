const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const listEndpoints = require("express-list-endpoints");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);

// console.log(listEndpoints(app));

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = app;
