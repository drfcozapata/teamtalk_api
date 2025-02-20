"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PersonalProfile extends Model {
    static associate(models) {
      PersonalProfile.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  PersonalProfile.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      pecodigo: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      penombre: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      pecedula: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      petelefono: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      peemail: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      pesalario: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      pedepartamento: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      pepuesto: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      pejefe: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pefoto: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      penumasegurado: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      pefechaingreso: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pecontrato: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      peasociado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      peestado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pediasvacaciones: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PersonalProfile",
      tableName: "personal_profiles",
    }
  );
  return PersonalProfile;
};
