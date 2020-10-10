'use strict';
const faker = require('faker');
const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data =[];
    let entry = null;
    console.log("seed order data:");
      for(var i=0; i<1000000; i++){
        console.log(`[${i+1}/1000000]`);
        entry = {
          OID: faker.random.number(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          phone: faker.random.number(),
          country: faker.address.country(),
          order_status: faker.helpers.randomize(['Preparing Order', 'Under Delivery' , 'Delivered']),
          item_price: faker.finance.amount(),
          quantity: faker.random.number(),
          total_price: faker.finance.amount(),
          pickup_time: "10/05/2020",
          delivery_time: "10/05/2020",
          createdAt: moment().format("MM-DD-YYYY hh:mm:ss"),
          updatedAt: moment().format("MM-DD-YYYY hh:mm:ss"),
        }
        data.push(entry);
      }
      console.log("--generating data completed");
    await queryInterface.bulkInsert("orders", data).then(()=>{
      console.log("--Seeding Process Completed");
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
  }
};
