const Sequelize = require('sequelize');

const sequelize = new Sequelize('tutor-app', 'root', 'Vipin@123', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;