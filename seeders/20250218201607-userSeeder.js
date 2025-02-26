"use strict";

const bcrypt = require("bcryptjs");
const { User, PersonalProfile } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "Francisco Zapata",
        email: "drfcozapata@gmail.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "SuperAdmin",
        blocked: false,
      },
      {
        name: "James Bond",
        email: "bond007@mi5.gov.uk",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "Administrador",
        blocked: false,
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "Empleado",
        blocked: true,
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "Empleado",
        blocked: false,
      },
    ];

    for (const userData of users) {
      const user = await User.create(userData);

      await PersonalProfile.create({
        user_id: user.id,
        pecodigo: String(user.id).padStart(4, "0"),
        penombre: user.name,
        peemail: user.email,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await PersonalProfile.destroy({ where: {} });
    await User.destroy({ where: {} });
  },
};
