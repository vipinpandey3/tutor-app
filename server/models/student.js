
module.exports = function(sequelize, DataTypes) {
    let Student = sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '-'
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '-'
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dob: {
            type: DataTypes.STRING,
        },
        religion: {
            type: DataTypes.CHAR(55),
            defaultValue: 'Hindu',
            allowNull: false,
        },
        gender: {
            type: DataTypes.CHAR(55),
            defaultValue: 'Male',
            allowNull: false
        },
        aadharNo: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        },
        panNo: {
            type: DataTypes.CHAR(55),
            allowNull: true,
            unique: true
        }
    })

    Student.associate = function(models) {
        Student.hasMany(models.Fees, {foreignKey: "StudentId"})
        Student.belongsTo(models.Parent)
        Student.hasMany(models.StudentEducationDetails, {foreignKey: "StudentId"});
        Student.hasMany(models.StudentAttendence, {foreignKey: "StundetId"});
    };

    return Student
}