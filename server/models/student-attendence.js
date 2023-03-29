module.exports = function(sequelize, DataTypes) {
    let StudentAttendence = sequelize.define('StudentAttendence', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        attendenceDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW()
        },
        inTime: {
            type: DataTypes.TIME,
            allowNull: DataTypes.NOW()
        },
        attendenceStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        remarks: {
            type: DataTypes.JSON,
            default: null,
            allowNull: true
        }
    });

    StudentAttendence.associate = function(models) {
        StudentAttendence.belongsTo(models.Student);
        StudentAttendence.belongsTo(models.StandardMaster)

        StudentAttendence.findAllAttendence = (where) => {
            return models.StudentAttendence.findAll({where: where})
        }

        StudentAttendence.getAllAttendencewithStandard = () => {
            return models.StudentAttendence.findAll({
                include: [
                    {
                        model: models.StandardMaster
                    },
                    {
                        model: models.Student
                    }
                ],
                groupBy: ['attendenceDate']
            })
        }
    }

    return StudentAttendence;
}