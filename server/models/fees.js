const Sequelize = require('sequelize');
const sequelize = require('./database');


const Fees = sequelize.define('fees', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    feesAmount: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    discount: {
        type: Sequelize. STRING,
        allowNull: false,
        defaultValue: "0.00"
    },
    paidAmount: {
        type: Sequelize.STRING,
        defaultValue: "0.00",
        allowNull: false
    },
    balance: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0.00'
    },
    academicYear: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '2000-2001',
    },
    reamarks: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: ''
    }
},
{
    freezeTableName: true,
}
)

module.exports = Fees