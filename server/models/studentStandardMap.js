const { sequelize } = require(".")

module.exports = function(sequelize, DataTypes) {
    let StudentStandardMap = sequelize.define('StudentStandardMap', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.CHAR(20),
            defaultValue: 'current', // Current | Passed | Failed | Recurrent
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
        }
    })

    StudentStandardMap.associate = function(models) {
        StudentStandardMap.belongsTo(models.Student, {
            foreignKey: "StudentId",
            as: "StudentMap"
        });
        StudentStandardMap.belongsTo(models.StandardMaster, {
            foreignKey: "StandardId",
            as: "StandardMap"
        })
    }

    return StudentStandardMap
}