const Sequelize = require('sequelize');
const sequelize = require('./database');

const ExamStdMap = sequelize.define('ExamStdMap', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ExamId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stdId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    // 1 - Active, 0-InActive
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

module.exports = SubjectMasters;