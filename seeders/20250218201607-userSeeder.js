"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Francisco Zapata",
        email: "drfcozapata@gmail.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "SuperAdmin",
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "James Bond",
        email: "bond007@mi5.gov.uk",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "Administrador",
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "Empleado",
        blocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        role: "Empleado",
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("users", null, {});
    };
  },
};
