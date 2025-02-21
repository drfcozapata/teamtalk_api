const jwt = require("jsonwebtoken");
const db = require("../models");

exports.showLoginForm = async (req, res) => {
  return res.status(200).json({
    message: "Este sería el sustituto temporal de la vista del Login",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.scope("withPassword").findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (user.blocked) {
      return res
        .status(403)
        .json({ error: "Su cuenta se encuentra suspendida" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout exitoso" });
};
