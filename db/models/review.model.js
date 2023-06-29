const { Model, DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('./products.model');
const { USER_TABLE } = require('./user.model');

const REVIEW_TABLE = 'review';

const ReviewSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USER_TABLE,
            key: 'id'
          },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        field: 'product_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
          },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Review extends Model {
    static associate(models){
        this.belongsTo(models.User, { as: 'user' });
        this.belongsTo(models.Product, { as: 'product' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: REVIEW_TABLE,
            modelNmae: 'Review',
            timestamps: false
        }
    }
}

module.exports = { REVIEW_TABLE, ReviewSchema, Review }