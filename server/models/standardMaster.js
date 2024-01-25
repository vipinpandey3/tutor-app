
module.exports = function(sequelize, DataTypes) {
    let StandardMaster = sequelize.define('StandardMaster', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        std: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stdCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        },
        // 1 - Active, 0-InActive
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        }
    },
    {
        freezeTableName: true
    }
    );

    StandardMaster.associate = function(models) {
        StandardMaster.belongsToMany(models.Exam, {
            as: "Exams",
            foreignKey: "StandardId",
            through: models.ExamStdMap
        });
        StandardMaster.belongsToMany(models.Student, {
            as: "StandarddMap",
            foreignKey: "StandardId",
            through: {
                model: models.StudentStandardMap,
                unique: false
            }
        })
        StandardMaster.hasMany(models.StudentAttendence)
        StandardMaster.hasMany(models.SubjectMaster)

        StandardMaster.getAllAttendenceByStandard = () => {
            return models.StandardMaster.findAll({
                logging: console.log,
                where: {
                    status: "Active"
                },
                include: [
                    {
                        model: models.StudentStandardMap,
                        as: "StandarddMap",
                        through: {
                            where: {
                                status: "current"
                            }
                        }
                    },
                    {
                        model: models.StudentAttendence,
                        required: true
                    }
                ]
            })
        }
    };

    return StandardMaster
}