const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE }=require('./user.model')

const ORDERS_TABLE = 'orders';

const OrdersSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    dateCreated: {
        field: 'date_created',
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.literal('CURRENT_DATE')
    },
    expirationDate: {
        field: 'expiration_date',
        type: DataTypes.DATEONLY,
    },
    active: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
    },
    complete: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
    }
}

class Orders extends Model {
    static associate(models){
        this.belongsToMany(models.Product, {
            as: 'products',
            through: models.OrderProducts,
            foreignKey: 'orderId',
            otherKey: 'productId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDERS_TABLE,
            modelNmae: 'Orders',
            timestamps: false
        }
    }
}

module.exports = { ORDERS_TABLE, OrdersSchema, Orders }