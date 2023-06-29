const { Model, DataTypes } = require('sequelize');

const TAG_TABLE = 'tags';

const TagSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

class Tag extends Model {
    static associate(models){
        this.belongsToMany(models.Product, {
            as: 'products',
            through: models.ProductTag,
            foreignKey: 'tagId',
            otherKey: 'productId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TAG_TABLE,
            modelName: 'Tag',
            timestamps: false,
        }
    }
};

module.exports = { TAG_TABLE, TagSchema, Tag };