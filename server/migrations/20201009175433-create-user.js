"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("users", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          role: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          verification_code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          verified: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          reset_token: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
