const { Test, TestSchema } = require('./test.model');
const { Product, ProductSchema } = require('./products.model');
const { Category, CategorySchema } = require('./category.model');
const { User, UserSchema} = require('./user.model')
const { Review, ReviewSchema } = require('./review.model');
const { Tag, TagSchema } = require('./tag.model');
const { ProductTag, ProductTagSchema } = require('./product-tag');
const { Orders, OrdersSchema} = require('./order.model')
const { OrderProducts,OrderProductsSchema}=require('./order-products.model')


function setupModels(sequelize) {
    //Inicializar
    Test.init(TestSchema, Test.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Review.init(ReviewSchema, Review.config(sequelize));
    Tag.init(TagSchema, Tag.config(sequelize));
    ProductTag.init(ProductTagSchema, ProductTag.config(sequelize));
    Orders.init(OrdersSchema, Orders.config(sequelize))
    OrderProducts.init(OrderProductsSchema, OrderProducts.config(sequelize))
    
    //Relaciones
    Product.associate(sequelize.models);
    Category.associate(sequelize.models);
    User.associate(sequelize.models)
    Review.associate(sequelize.models);
    Tag.associate(sequelize.models)
    Orders.associate(sequelize.models)
}

module.exports = setupModels;