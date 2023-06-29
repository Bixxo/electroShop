const { Model, DataTypes } = require('sequelize');

const { PRODUCT_TABLE } = require('./products.model');
const { TAG_TABLE } = require('./tag.model');

const PRODUCT_TAG_TABLE = 'products_tags';

const ProductTagSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
    tagId: {
        field: 'tag_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: TAG_TABLE,
            key: 'id'
          },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class ProductTag extends Model {
    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TAG_TABLE,
            modelName: 'ProductTag',
            timestamps: false,
        }
    }
}

module.exports = { PRODUCT_TAG_TABLE, ProductTagSchema, ProductTag }