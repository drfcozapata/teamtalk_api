const db = require("../models");
const PersonalProfile = db.PersonalProfile;
const User = db.User;
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models/index");

exports.index = async (req, res) => {
  try {
    const users = await User.findAll();
    const blocked = req.user ? req.user.blocked : false;

    if (!blocked) {
      return res.status(200).json({ users });
    } else {
      return res.status(403).json({ message: "Su usuario ha sido bloqueado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.suspendedAccount = (req, res) => {
  return res.status(403).json({ message: "Su cuenta ha sido suspendida" });
};

exports.store = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const user = await User.create(
      {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      },
      { transaction }
    );

    if (!user) {
      throw new Error("No se pudo crear el usuario");
    }

    const pecodigo = String(user.id).padStart(4, "0");

    const personalProfile = await PersonalProfile.create(
      {
        user_id: user.id,
        penombre: name,
        peemail: email,
        pecodigo,
      },
      { transaction }
    );

    if (!personalProfile) {
      throw new Error("No se pudo crear el perfil personal");
    }

    await transaction.commit();
    return res
      .status(201)
      .json({ message: "Usuario y su perfil creados exitosamente." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error en UserController@store:", error);
    return res
      .status(500)
      .json({ error: "Error al crear el usuario: " + error.message });
  }
};

exports.update = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { name, email, role, photo } = req.body;

    const user = await User.findByPk(id, { transaction });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (role) updatedFields.role = role;
    if (photo) updatedFields.profile_photo_path = `profile-photos/${photo}`;

    if (Object.keys(updatedFields).length > 0) {
      await user.update(updatedFields, { transaction });
    }

    const personalProfile = await PersonalProfile.findOne({
      where: { user_id: id },
      transaction,
    });

    if (personalProfile) {
      const profileUpdates = {};
      if (name) profileUpdates.penombre = name;
      if (email) profileUpdates.peemail = email;
      if (photo) profileUpdates.pefoto = `storage/profile-photos/${photo}`;

      if (Object.keys(profileUpdates).length > 0) {
        await personalProfile.update(profileUpdates, { transaction });
      }
    }

    await transaction.commit();
    return res
      .status(200)
      .json({ message: "Usuario y su perfil actualizados exitosamente." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error en UserController@update:", error);
    return res
      .status(500)
      .json({ error: "Error al actualizar el usuario: " + error.message });
  }
};

exports.updateBlocked = async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    if (typeof blocked !== "boolean") {
      return res
        .status(400)
        .json({ error: "El campo blocked debe ser un booleano" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.update({ blocked });
    return res
      .status(200)
      .json({ message: "Estado de bloqueo actualizado exitosamente." });
  } catch (error) {
    console.error("Error en UserController@updateBlocked:", error);
    return res.status(500).json({
      error: "Error al actualizar el estado de bloqueo: " + error.message,
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
    return res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en UserController@destroy:", error);
    return res
      .status(500)
      .json({ error: "Error al eliminar el usuario: " + error.message });
  }
};
