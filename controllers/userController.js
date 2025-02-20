// userController.js
const db = require("../models");
const User = db.User;
const PersonalProfile = db.PersonalProfile;
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

exports.index = async (req, res) => {
  try {
    const users = await User.findAll();
    const blocked = req.user.blocked;

    if (!blocked) {
      return res.status(200).json({ users });
    } else {
      return res.redirect("/suspended-account");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.suspendedAccount = (req, res) => {
  return res.status(403).json({ message: "Tu cuenta ha sido suspendida." });
};

exports.store = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { name, email, password, role, terms } = req.body;

    // Validación manual (considera usar una librería como joi)
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Campos requeridos incompletos" });
    }

    // Verificar email único
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role,
        terms: terms || false,
      },
      { transaction }
    );

    // Generar código de perfil
    const pecodigo = user.id.toString().padStart(4, "0");

    // Crear perfil personal
    await PersonalProfile.create(
      {
        user_id: user.id,
        penombre: name,
        peemail: email,
        pecodigo: pecodigo,
      },
      { transaction }
    );

    // Confirmar transacción
    await transaction.commit();

    return res.status(201).json({
      message: "Usuario y perfil creados exitosamente",
      user,
    });
  } catch (error) {
    // Revertir transacción en caso de error
    await transaction.rollback();
    console.error("Error en store:", error);

    return res.status(500).json({
      error: "Error al crear el usuario",
      details: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar email único
    const existingEmail = await User.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
      },
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    // Actualizar usuario
    await user.update({
      name,
      email,
      role,
    });

    // Manejar foto de perfil (si está presente)
    if (req.file) {
      const photoPath = `/uploads/profile-photos/${req.file.filename}`;
      await user.update({ profile_photo_path: photoPath });
    }

    // Actualizar perfil personal
    const [personalProfile, created] = await PersonalProfile.findOrCreate({
      where: { user_id: user.id },
      defaults: {
        penombre: name,
        peemail: email,
      },
    });

    if (!created) {
      await personalProfile.update({
        penombre: name,
        peemail: email,
        pefoto: req.file
          ? `/uploads/profile-photos/${req.file.filename}`
          : personalProfile.pefoto,
      });
    }

    return res.status(200).json({
      message: "Usuario y perfil actualizados exitosamente",
      user,
    });
  } catch (error) {
    console.error("Error en update:", error);
    return res.status(500).json({
      error: "Error al actualizar el usuario",
      details: error.message,
    });
  }
};

exports.updateBlocked = async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.update({ blocked });

    return res.status(200).json({
      message: "Estado de bloqueo actualizado",
      user,
    });
  } catch (error) {
    console.error("Error en updateBlocked:", error);
    return res.status(500).json({
      error: "Error al actualizar el estado de bloqueo",
      details: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error en destroy:", error);
    return res.status(500).json({
      error: "Error al eliminar el usuario",
      details: error.message,
    });
  }
};
