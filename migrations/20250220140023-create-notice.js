"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notices");
  },
};
