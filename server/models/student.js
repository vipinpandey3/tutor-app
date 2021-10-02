const Sequelize = require('sequelize');
const sequelize = require('./database');

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '-'
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '-'
    },
    emailId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    dob: {
        type: Sequelize.STRING,
    },
    religion: {
        type: Sequelize.CHAR(55),
        defaultValue: 'Hindu',
        allowNull: false,
    },
    gender: {
        type: Sequelize.CHAR(55),
        defaultValue: 'Male',
        allowNull: false
    },
    aadharNo: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true
    },
    panNo: {
        type: Sequelize.CHAR(55),
        allowNull: true,
        unique: true
    }
})

module.exports = Student