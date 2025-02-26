"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Message, {
        foreignKey: "user_id",
        as: "sentMessages",
      });

      User.hasMany(models.Message, {
        foreignKey: "recipient_id",
        as: "receivedMessages",
      });

      User.hasMany(models.Notice, {
        foreignKey: "user_id",
        as: "notices",
      });

      User.hasMany(models.Payroll, {
        foreignKey: "user_id",
        as: "payrolls",
      });

      User.hasOne(models.PersonalProfile, {
        foreignKey: "user_id",
        as: "personalProfile",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      profile_photo_path: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
      hooks: {
        beforeCreate: async (user) => {
          if (
            user.password &&
            !user.password.startsWith("$2a$") &&
            !user.password.startsWith("$2b$")
          ) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.getProfilePhotoUrlAttribute = function () {
    return this.profile_photo_path
      ? `/storage/${this.profile_photo_path}`
      : "/default-profile.png";
  };

  return User;
};
