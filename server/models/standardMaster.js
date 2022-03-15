
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
            as: "StdMap",
            foreignKey: "StandardId",
            through: {
                model: models.ExamStdMap,
                unique: false
            }
        });
        StandardMaster.hasMany(models.SubjectMaster)
    };

    return StandardMaster
}