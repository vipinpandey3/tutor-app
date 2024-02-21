
module.exports = function(sequelize, DataTypes) {
    let UserEducationDetails = sequelize.define("UserEducationDetails", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        std: {
            type: DataTypes.CHAR(16),
            allowNull: false
        },
        seatNumber: {
            type: DataTypes.CHAR(55),
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fieldJSON1: {
            type: DataTypes.JSON,
            allowNull: true,
        } ,
        totalMarks: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instituteName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        universityName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    UserEducationDetails.associate = function(models) {
        UserEducationDetails.belongsTo(models.User)
    };

    return UserEducationDetails;
}