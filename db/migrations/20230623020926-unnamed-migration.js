'use strict';
const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/products.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'sold', {
      
      defaultValue: 0,
      type: DataTypes.INTEGER,
    
    })
  },

  async down (queryInterface) {
    
  }
};
