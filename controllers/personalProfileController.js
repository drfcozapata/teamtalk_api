const { PersonalProfile, User } = require("../models");

class PersonalProfileController {
  static async index(req, res) {
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
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async update(req, res) {
    try {
      const { profileId } = req.params;
      const validatedData = req.body; // Asegúrate de validar esto antes

      const personalProfile = await PersonalProfile.findByPk(profileId);
      if (!personalProfile) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }

      await personalProfile.update(validatedData);
      return res.json({ message: "Perfil personal actualizado exitosamente." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }

  static async destroy(req, res) {
    try {
      const { profileId } = req.params;
      const personalProfile = await PersonalProfile.findByPk(profileId);
      if (!personalProfile) {
        return res
          .status(404)
          .json({ message: "Perfil personal no encontrado" });
      }

      await personalProfile.destroy();
      return res.json({ message: "Perfil personal eliminado exitosamente." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }
}

module.exports = PersonalProfileController;
