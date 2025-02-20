const { Message, User } = require("../models");

class MessageController {
  static async index(req, res) {
    try {
      const messages = await Message.findAll({
        where: { user_id: req.user.id },
        include: [{ model: User, as: "recipient" }],
        order: [["createdAt", "DESC"]],
      });
      return res.json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async store(req, res) {
    try {
      const { recipient_id, content } = req.body;
      const message = await Message.create({
        user_id: req.user.id,
        recipient_id,
        content,
      });
      return res.status(201).json(message);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async softDelete(req, res) {
    try {
      const { messageId } = req.params;
      const message = await Message.findByPk(messageId);
      if (!message) {
        return res.status(404).json({ message: "Mensaje no encontrado" });
      }
      await message.destroy();
      return res.json({ message: "Mensaje eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async hardDelete(req, res) {
    try {
      const { messageId } = req.params;
      await Message.destroy({ where: { id: messageId } });
      return res.json({ message: "Mensaje eliminado permanentemente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }
}

module.exports = MessageController;
