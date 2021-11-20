const Sequelize = require('sequelize');
const sequelize = require('./database');

const SubjectMaster = sequelize.define('SubjectMaster', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subjectCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ticker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    remarks: {
        type: Sequelize.STRING,
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
    },
    stdId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
    }
},
{
    freezeTableName: true
}
);

module.exports = SubjectMaster