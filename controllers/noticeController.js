const db = require("../models");
const Notice = db.Notice;
const User = db.User;

exports.index = async (req, res) => {
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

    const formatNotice = (notice) => ({
      id: notice.id,
      user_id: notice.user_id,
      username: notice.user.name,
      avatar: notice.user.profile_photo_path || "avatars/0000.png",
      category: notice.category,
      title: notice.title,
      content: notice.content.replace(/\n/g, "<br>"),
      img: notice.img || "notices/00.jpg",
      date: notice.createdAt.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });

    const lastNotice =
      notices.length > 0
        ? formatNotice(notices[0])
        : {
            id: null,
            user_id: null,
            username: "No disponible",
            avatar: "avatars/0000.png",
            category: "General",
            title: "No hay anuncios disponibles",
            content: "",
            img: "notices/00.jpg",
            date: new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          };

    return res.json({
      todayNotices: todayNotices.map(formatNotice),
      otherNotices: otherNotices.map(formatNotice),
      lastNotice: lastNotice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

exports.store = async (req, res) => {
  try {
    const { user_id, category, title, content } = req.body;

    const noticeData = {
      userId: user_id,
      category,
      title,
      content,
    };

    if (req.file) {
      noticeData.img = req.file.path;
    }

    const notice = await Notice.create(noticeData);

    res.status(201).json({
      message: "Anuncio creado exitosamente",
      notice,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear anuncio",
      errors: error.errors,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const notice = await Notice.findByPk(noticeId);
    if (!notice) {
      return res.status(404).json({ error: "Anuncio no encontrado" });
    }
    await notice.destroy();
    return res.json({ message: "Anuncio eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
