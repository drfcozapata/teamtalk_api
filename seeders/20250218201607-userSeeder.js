"use strict";
const bcrypt = require("bcryptjs");
const { User, PersonalProfile } = require("../models");
const usersData = require("../data/usersData.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const userData of usersData) {
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: bcrypt.hashSync("password", 10),
        role: userData.role,
        blocked: userData.blocked,
        profile_photo_path: userData.profile_photo_path,
      });

      await PersonalProfile.create({
        user_id: user.id,
        pecodigo: userData.profile.pecodigo,
        penombre: userData.profile.penombre,
        pecedula: userData.profile.pecedula,
        petelefono: userData.profile.petelefono,
        peemail: userData.profile.peemail,
        pesalario: userData.profile.pesalario,
        pedepartamento: userData.profile.pedepartamento,
        pepuesto: userData.profile.pepuesto,
        pejefe: userData.profile.pejefe,
        pefoto: userData.profile.pefoto,
        penumasegurado: userData.profile.penumasegurado,
        pefechaingreso: userData.profile.pefechaingreso,
        pecontrato: userData.profile.pecontrato,
        peasociado: userData.profile.peasociado,
        peestado: userData.profile.peestado,
        pediasvacaciones: userData.profile.pediasvacaciones,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await PersonalProfile.destroy({ where: {} });
    await User.destroy({ where: {} });
  },
};
