const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = app;
