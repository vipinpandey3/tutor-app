const Sequelize = require('sequelize');
const sequelize = require('./database');

const ExcelImport = sequelize.define('ExcelImport', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fileName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    uploadedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    filePath: {
        type: Sequelize.CHAR,
        allowNull: true,
    }
},
{
    freezeTableName: true,
}
);

module.exports = ExcelImport