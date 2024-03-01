module.exports = function(sequelize, DataTypes) {
    let UserStandardMaps = sequelize.define('UserStandardMaps', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        standard_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subject_id: {
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
    
    UserStandardMaps.associate = function(models) {
        UserStandardMaps.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: "UserMap",
        })

        UserStandardMaps.belongsTo(models.StandardMaster, {
            foreignKey: 'standard_id',
            as: "StandardMap",
        })
    }

    return UserStandardMaps
}