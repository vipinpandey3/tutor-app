const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('user', {
    id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    emailId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.CHAR,
        allowNull: false,
        default: "active"
    }
})

module.exports = User;