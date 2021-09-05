const Sequelize = require('sequelize');
const sequelize = require('./database');

const Teacher = sequelize.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'John Doe'
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    religion: {
        type: Sequelize.CHAR(55),
        defaultValue: "Hindu",
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
        allowNull: false,
        unique: true
    },
    emailId: {
        type: Sequelize.CHAR(55),
        allowNull: false,
        unique: true
    }
})

module.exports = Teacher