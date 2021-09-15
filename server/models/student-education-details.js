const Sequelize = require('sequelize');
const sequelize = require('./database');

const StudentEducationDetails = sequelize.define('studentEducationDetails', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    std: {
        type: Sequelize.CHAR(16),
        allowNull: false
    },
    seatNumber: {
        type: Sequelize.CHAR(55),
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fieldJSON1: {
        type: Sequelize.JSON,
        allowNull: true,
    } ,
    totalMarks: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    instituteName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    universityName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = StudentEducationDetails;