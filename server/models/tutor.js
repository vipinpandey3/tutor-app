module.exports = function(sequelize, DataTypes) {
    let Tutor = sequelize.define('Tutor', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'John Doe'
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        religion: {
            type: DataTypes.CHAR(55),
            defaultValue: "Hindu",
        },
        gender: {
            type: DataTypes.CHAR(55),
            defaultValue: 'Male',
            allowNull: false
        },
        aadharNo: {
            type: DataTypes.STRING(16),
            allowNull: true,
            unique: true
        },
        panNo: {
            type: DataTypes.CHAR(55),
            allowNull: true,
            unique: false
        },
        emailId: {
            type: DataTypes.CHAR(55),
            allowNull: false,
            unique: true
        },
        mobileNo: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        }
    });

    Tutor.associate = function(models) {
        Tutor.hasMany(models.TutorEducationDetails, {foreignKey: "TutorId"});
        Tutor.hasMany(models.TutorAttendence, {foreignKey: "TutorId"})
    };

    return Tutor;
}