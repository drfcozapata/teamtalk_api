const db = require("../models");
const Message = db.Message;
const User = db.User;
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    const user = req.user;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { recipient_id: user.id, trashscan_recipient: false },
          { user_id: user.id, trashscan_user: false },
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    // Filtrar mensajes de bandeja de entrada
    const inboxMessages = messages.filter(
      (message) =>
        message.recipient_id === user.id && !message.trashscan_recipient
    );

    // Filtrar mensajes enviados
    const outboxMessages = messages.filter(
      (message) => message.user_id === user.id && !message.trashscan_user
    );

    // Filtrar mensajes en papelera
    const trashMessages = messages.filter(
      (message) =>
        (message.user_id === user.id &&
          message.trashscan_user &&
          !message.deleted_message_user) ||
        (message.recipient_id === user.id &&
          message.trashscan_recipient &&
          !message.deleted_message_recipient)
    );

    // Obtener usuarios que no están bloqueados y no son SuperAdmin
    const users = await User.findAll({
      where: {
        blocked: false,
        role: { [Op.ne]: "SuperAdmin" },
      },
    });

    res.status(200).json({
      inboxMessages,
      outboxMessages,
      trashMessages,
      users,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.store = async (req, res) => {
  try {
    const { recipient_id, content } = req.body;
    const message = await Message.create({
      user_id: req.user.id,
      recipient_id,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.storeOutbox = async (req, res) => {
  try {
    // Validación de datos (puedes usar una librería como joi para validación más robusta)
    const { recipient_id, recipient_name, recipient_avatar, subject, content } =
      req.body;

    // Procesar avatares
    let processedRecipientAvatar = recipient_avatar;
    let processedSenderAvatar = req.user.avatar;

    if (
      processedRecipientAvatar &&
      processedRecipientAvatar.startsWith("api/")
    ) {
      processedRecipientAvatar = "";
    }
    if (processedSenderAvatar && processedSenderAvatar.startsWith("api/")) {
      processedSenderAvatar = "";
    }

    // Crear mensaje
    const message = await Message.create({
      user_id: req.user.id,
      recipient_id,
      recipient_name,
      recipient_avatar: processedRecipientAvatar,
      sender_name: req.user.name,
      sender_avatar: processedSenderAvatar,
      subject,
      content,
      trashscan_user: false,
      trashscan_recipient: false,
      deleted_message_user: false,
      deleted_message_recipient: false,
      date: new Date().toISOString(),
    });

    res.status(201).json({
      message: "Mensaje enviado con éxito",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.softDelete = async (req, res) => {
  try {
    const { message: messageId } = req.params;
    const { trashscan_user, trashscan_recipient } = req.body;

    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }

    await message.update({
      trashscan_user,
      trashscan_recipient,
    });

    res.json({
      message: "Mensaje movido a la papelera",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.hardDelete = async (req, res) => {
  try {
    const { message: messageId } = req.params;
    const { deleted_message_user, deleted_message_recipient } = req.body;

    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }

    await message.update({
      deleted_message_user,
      deleted_message_recipient,
    });

    res.json({
      message: "Mensaje eliminado de la papelera",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { message: messageId } = req.params;
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }

    await message.destroy();

    res.json({ message: "Mensaje eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
