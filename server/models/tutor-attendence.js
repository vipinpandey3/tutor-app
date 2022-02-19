module.exports = function(sequelize, DataTypes) {
    let TutorAttendence = sequelize.define('TutorAttendence', {
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
        outTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        remarks: {
            type: DataTypes.JSON,
            default: null,
            allowNull: true
        }
    });

    TutorAttendence.associate = function(models) {
        TutorAttendence.belongsTo(models.Tutor)
    }

    return TutorAttendence;
}