"use strict";

const { Notice } = require("../models");
const noticesData = require("../data/noticesData.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const noticeData of noticesData.notices) {
      await Notice.create({
        id: noticeData.id,
        user_id: noticeData.user_id,
        category: noticeData.category,
        title: noticeData.title,
        content: JSON.stringify(noticeData.content),
        img: noticeData.img,
        createdAt: noticeData.createdAt,
        updatedAt: noticeData.updatedAt,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await Notice.destroy({ where: {} });
  },
};
