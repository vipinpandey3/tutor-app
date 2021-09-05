const Sequelize = require('sequelize');
const sequelize = require('./database');

const StudentParentMap = sequelize.define('studentParentMap', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = StudentParentMap