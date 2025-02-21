const db = require("../models");
const PersonalProfile = db.PersonalProfile;
const User = db.User;

exports.index = async (req, res) => {
  try {
    const personalProfiles = await PersonalProfile.findAll({
      include: [{ model: User, as: "user" }],
    });
    const user = req.user;
    const personalProfileUser = await PersonalProfile.findOne({
      where: { user_id: user.id },
    });

    const personalProfilesWithBlocked = personalProfiles.map((profile) => ({
      id: profile.id,
      user_id: profile.user_id,
      pecodigo: profile.pecodigo,
      penombre: profile.penombre,
      pecedula: profile.pecedula,
      petelefono: profile.petelefono,
      peemail: profile.peemail,
      pesalario: profile.pesalario,
      pedepartamento: profile.pedepartamento,
      pepuesto: profile.pepuesto,
      pejefe: profile.pejefe,
      pefoto: profile.pefoto,
      penumasegurado: profile.penumasegurado,
      pefechaingreso: profile.pefechaingreso,
      pecontrato: profile.pecontrato,
      peasociado: profile.peasociado,
      peestado: profile.peestado,
      pediasvacaciones: profile.pediasvacaciones,
      blocked: profile.user.blocked,
    }));

    return res.json({
      personalProfiles: personalProfilesWithBlocked,
      user,
      personalProfileUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

exports.update = async (req, res) => {
  try {
    const { pecodigo } = req.params;
    const profileData = req.body;

    const personalProfile = await PersonalProfile.findOne({
      where: { pecodigo },
    });

    if (!personalProfile) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    const user = await User.findByPk(personalProfile.user_id);
    if (user.profilePhotoPath) {
      profileData.pefoto = `storage/${user.profilePhotoPath}`;
    }

    await personalProfile.update(profileData);
    return res.json({
      message: "Perfil personal actualizado exitosamente",
      personalProfile,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar perfil",
      errors: error.errors,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { pecodigo } = req.params;

    const personalProfile = await PersonalProfile.findOne({
      where: { pecodigo },
    });
    if (!personalProfile) {
      return res.status(404).json({ error: "Perfil personal no encontrado" });
    }

    await personalProfile.destroy();
    return res.json({ message: "Perfil personal eliminado exitosamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
