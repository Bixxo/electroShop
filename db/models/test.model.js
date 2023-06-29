const { Model, DataTypes, Sequelize } = require('sequelize');

const TEST_TABLE = 'test_table';

const TestSchema = {
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

class Test extends Model {
    static associate(){

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TEST_TABLE,
            modelNmae: 'Test',
            timestamps: false
        }
    }
}

module.exports = { TEST_TABLE, TestSchema, Test }