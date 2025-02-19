const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
// const listEndpoints = require("express-list-endpoints");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);

// console.log(listEndpoints(app));

db.sequelize
  .sync()
  .then(() => {
    console.log("Base de Datos sincronizada");
  })
  .catch((err) => {
    console.error("Error sincronizando la base de datos:", err);
  });

module.exports = app;
