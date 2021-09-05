const Sequelize = require('sequelize');
const sequelize = require('./database');

const StudentTeacherMap = sequelize.define('studentTeachMap', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
},
{
    freezeTableName: true,
}
)

module.exports = StudentTeacherMap