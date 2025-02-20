"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class IncomesOutcome extends Model {
    static associate(models) {
      // define association here
    }
  }
  IncomesOutcome.init(
    {
      field: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      type: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      order: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "IncomesOutcome",
      tableName: "incomes_outcomes",
    }
  );
  return IncomesOutcome;
};
