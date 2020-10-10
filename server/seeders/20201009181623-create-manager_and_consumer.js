"use strict";
const moment = require("moment");
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var salt = bcrypt.genSaltSync(10);
    var hashed_password = bcrypt.hashSync("demo", salt);
    await queryInterface.bulkInsert("users", [
      {
        name: "manager",
        username: "manager",
        password: hashed_password,
        phone:"00000000000",
        email: "manager@e-butler.com",
        role: "manager",
        verified:1,
        verification_code:Math.random().toString(36).slice(-8),
        reset_token:Math.random().toString(36).slice(-8),
        createdAt: moment().format("MM-DD-YYYY hh:mm:ss"),
        updatedAt: moment().format("MM-DD-YYYY hh:mm:ss"),
      },
      {
        name: "consumer",
        username: "consumer",
        password: hashed_password,
        email: "consumer@e-butler.com",
        phone:"00000000000",
        role: "consumer",
        verified:1,
        verification_code:Math.random().toString(36).slice(-8),
        reset_token:Math.random().toString(36).slice(-8),
        createdAt: moment().format("MM-DD-YYYY hh:mm:ss"),
        updatedAt: moment().format("MM-DD-YYYY hh:mm:ss"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
