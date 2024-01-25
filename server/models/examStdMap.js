module.exports = function(sequelize, DataTypes) {
    let ExamStdMap = sequelize.define('ExamStdMap', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        remarks: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        },
        //  0 - cancel, 1 - Active, 2-Postpone, 3-Done,
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        }
    },
    {
        freezeTableName: true
    }
    )

    ExamStdMap.associate = function(models) {
        ExamStdMap.belongsTo(models.Exam,
            {
            foreignKey: "ExamId",
            as: "Exam"
            }
        );
        ExamStdMap.belongsTo(models.StandardMaster,
            {
                foreignKey: "StandardId",
                as: "Standard"
            }
        );

        // ExamStdMap.getActiveExams = function(whereQuery) {
        //     return models.ExamStdMap.findAll({
        //         where: whereQuery,
        //         include: [
        //             {
        //                 mod
        //             }
        //         ]
        //     })
        // }

        ExamStdMap.ACTIVE_STATUS = 1;
    }

    return ExamStdMap
}