const { Notice, User } = require("../models");

class NoticeController {
  static async index(req, res) {
    try {
      const notices = await Notice.findAll({
        include: [{ model: User, as: "user" }],
        order: [["createdAt", "DESC"]],
      });

      const today = new Date().toISOString().split("T")[0];
      const todayNotices = notices.filter(
        (notice) => notice.createdAt.toISOString().split("T")[0] === today
      );
      const otherNotices = notices.filter(
        (notice) => notice.createdAt.toISOString().split("T")[0] !== today
      );
      const lastNotice = notices[0];

      const formatNotice = (notice) => ({
        id: notice.id,
        user_id: notice.user_id,
        username: notice.user.name,
        avatar: notice.user.profile_photo_path || "default-avatar.png",
        category: notice.category,
        title: notice.title,
        content: notice.content.replace(/\n/g, "<br>"),
        img: notice.img || "notices/00.jpg",
        date: notice.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });

      const lastNoticeFormatted = lastNotice
        ? formatNotice(lastNotice)
        : {
            id: null,
            user_id: null,
            username: "No disponible",
            avatar: "default-avatar.png",
            category: "General",
            title: "No hay anuncios disponibles",
            content: "",
            img: "notices/00.jpg",
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          };

      return res.json({
        todayNotices: todayNotices.map(formatNotice),
        otherNotices: otherNotices.map(formatNotice),
        lastNotice: lastNoticeFormatted,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async store(req, res) {
    try {
      const { user_id, category, title, content, img } = req.body;

      const notice = await Notice.create({
        user_id,
        category,
        title,
        content,
        img,
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async destroy(req, res) {
    try {
      const { noticeId } = req.params;
      const notice = await Notice.findByPk(noticeId);
      if (!notice) {
        return res.status(404).json({ message: "Anuncio no encontrado" });
      }
      await notice.destroy();
      return res.json({ message: "Anuncio eliminado con éxito" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }
}

module.exports = NoticeController;
