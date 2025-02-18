"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        name: "Francisco Zapata",
        email: "drfcozapata@gmail.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ana Karyna Herrera",
        email: "anak@email.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password:
          "$2a$10$uvnCeNMUg/68fWYj74/Ec.py3q2mkc0iqOCliM.0En8Zb7ajwHUsu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Users", null, {});
    };
  },
};
