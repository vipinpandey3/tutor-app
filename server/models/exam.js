const Sequelize = require('sequelize');
const sequelize = require('./database');

const Exam = sequelize.define('Exam', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    examSubjects: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    timeStart: {
        type: Sequelize.TIME,
        allowNull: false
    },
    timeEnd: {
        type: Sequelize.TIME,
        allowNull: false
    },
    examDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    remarks: {
        type: Sequelize.JSON,
        allowNull: true
    },
    marks: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // 1-Daily, 2-Weekly, 3-Monthly, 4-Half-Sem,5-Semester,
    examType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValues: 5
    },
    academicYear: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValues: '2021-2022'
    }
},
{
    freezeTableName: true,
}
)

module.exports = Exam

