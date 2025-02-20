"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("personal_profiles", {
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
      pecodigo: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      penombre: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      pecedula: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      petelefono: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      peemail: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pesalario: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      pedepartamento: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      pepuesto: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      pejefe: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      pefoto: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      penumasegurado: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      pefechaingreso: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      pecontrato: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      peasociado: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      peestado: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pediasvacaciones: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("personal_profiles");
  },
};
