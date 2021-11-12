const Sequelize = require('sequelize');
const sequelize = require('./database');

const StandardtMasters = sequelize.define('StandardMaster', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    std: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stdCode: {
        type: Sequelize.STRING,
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