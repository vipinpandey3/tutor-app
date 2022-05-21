
module.exports = function(sequelize, DataTypes) {
    let StudentEducationDetails = sequelize.define('StudentEducationDetails', {
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

    StudentEducationDetails.associate = function(models) {
        StudentEducationDetails.belongsTo(models.Student);

        StudentEducationDetails.createDetails = function(data) {
            return models.StudentEducationDetails.create(data);
        }
    }

    return StudentEducationDetails

}