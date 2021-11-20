const Sequelize = require('sequelize');
const sequelize = require('./database');

const ExamStdMap = sequelize.define('ExamStdMap', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    remarks: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
    },
    //  0 - cancel, 1 - Active, 2-Done, 3-Postpone 
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
    }
},
{
    freezeTableName: true
}
)

module.exports = ExamStdMap;