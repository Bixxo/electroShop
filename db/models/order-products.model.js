const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('./products.model');
const { ORDERS_TABLE } = require('./order.model');


const ORDER_PRODUCT_TABLE = 'order_products';

const OrderProductsSchema = {
    orderId: {
        field: 'Order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ORDERS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    unitPrice: {
        field: 'unit_price',
        type: DataTypes.DECIMAL(30,2)
    },
    discount: {
        type: DataTypes.INTEGER
    },
}

class OrderProducts extends Model {
    static associate(){
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelNmae: 'OrderProducts',
            timestamps: false
        }
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductsSchema, OrderProducts }