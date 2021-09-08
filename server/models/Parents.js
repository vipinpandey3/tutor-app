const Sequelize = require('sequelize');
const sequelize = require('./database');

const Parent = sequelize.define('parent', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fatherName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    motherName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    fatherEmailId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    fatherAadhar: {
        type: Sequelize.CHAR(12),
        unique: true
    },
    motherAadhar: {
        type: Sequelize.CHAR(12),
        unique: true
    },
    motherEmailId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    fatherDob: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW()
    },
    motherdob: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW()
    },
    fatherHighestQualifaction: Sequelize.STRING,
    motherHighestQualification: Sequelize.STRING,
});

module.exports = Parent;