module.exports = function(sequelize, DataTypes) {
    let TutorEducationDetails = sequelize.define("TutorEducationDetails", {
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

    TutorEducationDetails.associate = function(models) {
        TutorEducationDetails.belongsTo(models.Tutor)
    };

    return TutorEducationDetails;
}