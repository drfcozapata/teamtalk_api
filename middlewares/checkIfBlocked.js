const db = require("../models");
const User = db.User;

const checkIfBlocked = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id);

      if (user && user.blocked && req.path !== "/suspended-account") {
        return res
          .status(403)
          .json({ message: "Su cuenta ha sido suspendida" });
      }
    }

    next();
  } catch (error) {
    console.error("Error en el middleware checkIfBlocked:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = checkIfBlocked;
