const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const personalProfileRoutes = require("./routes/personalProfileRoutes");
const path = require("path");
const payrollRoutes = require("./routes/payrollRoutes");
const userRoutes = require("./routes/userRoutes");
// const listEndpoints = require("express-list-endpoints");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:4100",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", noticeRoutes);
app.use("/api", messageRoutes);
app.use("/api", personalProfileRoutes);
app.use("/api", payrollRoutes);
app.use("/api", userRoutes);

// console.log(listEndpoints(app));

app.use((err, req, res, next) => {
  if (err.code === "ENOENT") {
    return res.status(404).json({ message: "Archivo no encontrado" });
  }
  next(err);
});

db.sequelize
  .sync({ logging: false })
  .then(() => {
    console.log("Base de Datos sincronizada");
  })
  .catch((err) => {
    console.error("Error sincronizando la base de datos:", err);
  });

module.exports = app;
