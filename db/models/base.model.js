const { Model, DataTypes, Sequelize } = require('sequelize');

const BASE_TABLE = '';

const BaseSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

class Base extends Model {
    static associate(){

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BASE_TABLE,
            modelNmae: 'Base',
            timestamps: false
        }
    }
}

module.exports = { BASE_TABLE, BaseSchema, Base }