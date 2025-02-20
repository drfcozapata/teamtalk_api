const { User } = require("../models");

const checkIfBlocked = async (req, res, next) => {
  try {
    // Suponiendo que el ID del usuario está en el token o en la sesión
    const userId = req.user.id; // Ajusta esto según tu implementación de autenticación

    // Buscar el usuario en la base de datos
    const user = await User.findByPk(userId);

    // Si el usuario no existe, devolver un error
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comprobar si el usuario está bloqueado
    if (user.blocked) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: cuenta bloqueada" });
    }

    // Si no está bloqueado, continuar con la siguiente función middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { checkIfBlocked };
