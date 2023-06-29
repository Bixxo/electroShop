'use strict';

const { ORDER_PRODUCT_TABLE,OrderProductsSchema } = require('../models/order-products.model');
const { ORDERS_TABLE,OrdersSchema } = require('../models/order.model');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDERS_TABLE,OrdersSchema)
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductsSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
    await queryInterface.createTable(ORDERS_TABLE)
  }
};
