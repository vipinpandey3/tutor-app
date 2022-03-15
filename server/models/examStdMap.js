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
        //  0 - cancel, 1 - Active, 2-Done, 3-Postpone 
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
            as: "ExamMap"
            }
        );
        ExamStdMap.belongsTo(models.StandardMaster,
            {
                foreignKey: "StandardId",
                as: "StdMap"
            }
        );
    }

    return ExamStdMap
}