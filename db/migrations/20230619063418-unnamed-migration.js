'use strict';

const { PRODUCT_TAG_TABLE, ProductTagSchema } = require('../models/product-tag');
const { TAG_TABLE, TagSchema } = require('../models/tag.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(TAG_TABLE, TagSchema);
    await queryInterface.createTable(PRODUCT_TAG_TABLE, ProductTagSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_TAG_TABLE);
    await queryInterface.dropTable(TAG_TABLE);
  }
};
