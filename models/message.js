"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "sender",
      });

      Message.belongsTo(models.User, {
        foreignKey: "recipient_id",
        as: "recipient",
      });
    }
  }
  Message.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipient_avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sender_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender_avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      trashscan_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deleted_message_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      trashscan_recipient: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deleted_message_recipient: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
    }
  );
  return Message;
};
