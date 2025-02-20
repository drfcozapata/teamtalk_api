"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    static associate(models) {
      Notice.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Notice.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Notice",
      tableName: "notices",
    }
  );
  return Notice;
};
