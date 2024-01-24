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
        endDate: {
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
            as: "Standards",
            foreignKey: "ExamId",
            through: models.ExamStdMap,
        });

        Exam.getActiveExamByCondition = function(whereQuery) {
            return models.Exam.findAll({
                where: whereQuery,
                include: [
                    {
                        model: models.StandardMaster,
                        as: 'ExamMap',
                        through: {
                            where: {
                                status: models.ExamStdMap.ACTIVE_STATUS
                            }
                        },
                        require: true
                    }
                ]
            })
        };
    };

    return Exam
}

