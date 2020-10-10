"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("orders", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
          },
          OID: {
            type: Sequelize.STRING,
          },
          first_name: {
            type: Sequelize.STRING,
          },
          last_name: {
            type: Sequelize.STRING,
          },
          phone: {
            type: Sequelize.STRING,
          },
          country: {
            type: Sequelize.STRING,
          },
          order_status: {
            type: Sequelize.STRING,
          },
          item_price: {
            type: Sequelize.DECIMAL,
          },
          quantity: {
            type: Sequelize.INTEGER,
          },
          total_price: {
            type: Sequelize.DECIMAL,
          },
          pickup_time: {
            type: Sequelize.DATE,
          },
          delivery_time: {
            type: Sequelize.DATE,
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
    await queryInterface.dropTable("orders");
  },
};
