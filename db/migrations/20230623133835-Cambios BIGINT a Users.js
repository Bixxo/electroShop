'use strict';

const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(USER_TABLE,'dni',{
      allowNull: false,
      unique: true,
      type: DataTypes.BIGINT
    })
    await queryInterface.changeColumn(USER_TABLE,'phoneNumber',{
      field:'phone_number',
      allowNull: false,
      unique: true,
      type: DataTypes.BIGINT
  })
  },

  async down (queryInterface) {
  
  }
};
