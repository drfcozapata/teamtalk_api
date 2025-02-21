const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const personalProfileRoutes = require("./routes/personalProfileRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const userRoutes = require("./routes/userRoutes");
// const listEndpoints = require("express-list-endpoints");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", noticeRoutes);
app.use("/api", messageRoutes);
app.use("/api", personalProfileRoutes);
app.use("/api", payrollRoutes);
app.use("/api", userRoutes);

// console.log(listEndpoints(app));

db.sequelize
  .sync({ logging: false })
  .then(() => {
    console.log("Base de Datos sincronizada");
  })
  .catch((err) => {
    console.error("Error sincronizando la base de datos:", err);
  });

module.exports = app;
