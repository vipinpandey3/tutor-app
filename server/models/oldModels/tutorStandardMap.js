module.exports = function(sequelize, DataTypes) {
    let TutorStandardMaps = sequelize.define('TutorStandardMaps', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        standard_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subjectId: {
            type: DataTypes.INTEGER,
            allowNull: false // Assuming subjectId cannot be null
        },
        academic_year: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_class_teacher: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    });

    return TutorStandardMaps
}