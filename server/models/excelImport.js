module.exports = function(sequelize, DataTypes) {
    let ExcelImport = sequelize.define('ExcelImport', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploadedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        filePath: {
            type: DataTypes.CHAR,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        freezeTableName: true,
    }
    );

    return ExcelImport
}