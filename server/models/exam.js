module.exports = function(sequelize, DataTypes) {
    let Exam = sequelize.define('Exam', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        examSubjects: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        timeStart: {
            type: DataTypes.TIME,
            allowNull: false
        },
        timeEnd: {
            type: DataTypes.TIME,
            allowNull: false
        },
        examDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        remarks: {
            type: DataTypes.JSON,
            allowNull: true
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // 1-Daily, 2-Weekly, 3-Monthly, 4-Half-Sem,5-Semester,
        examType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValues: 5
        },
        academicYear: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValues: '2021-2022'
        }
    },
    {
        freezeTableName: true,
    }
    );

    Exam.associate = function(models) {
        // Exam.belongsTo(models.)
        Exam.belongsToMany(models.StandardMaster, {
            as: "ExamMap",
            foreignKey: "ExamId",
            through: {
                model: models.ExamStdMap,
                unique: false
            }
        })
    };

    return Exam
}

