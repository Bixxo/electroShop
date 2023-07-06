'use strict';
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { OrderProductsSchema, ORDER_PRODUCT_TABLE } = require('../models/order-products.model');
const { OrdersSchema, ORDERS_TABLE} = require('../models/order.model');
const { ProductTagSchema, PRODUCT_TAG_TABLE } = require('../models/product-tag');
const { ProductSchema, PRODUCT_TABLE } = require('../models/products.model');
const { ReviewSchema, REVIEW_TABLE } = require('../models/review.model');
const { TagSchema, TAG_TABLE } = require('../models/tag.model');
const { UserSchema, USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(TAG_TABLE, TagSchema);
    await queryInterface.createTable(REVIEW_TABLE, ReviewSchema);
    await queryInterface.createTable(ORDERS_TABLE, OrdersSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductsSchema);
    await queryInterface.createTable(PRODUCT_TAG_TABLE, ProductTagSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDERS_TABLE);
    await queryInterface.dropTable(PRODUCT_TAG_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(REVIEW_TABLE);
    await queryInterface.dropTable(TAG_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
