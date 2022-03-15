
module.exports = function (sequelize, DataTypes) {
    let SubjectMaster = sequelize.define('SubjectMaster', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        subjectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subjectCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ticker: {
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
    }
    );

    // SubjectMaster.associate = function(models) {
    //     SubjectMaster.belongsTo(models.StandardtMasters)
    // }

    return SubjectMaster;
}