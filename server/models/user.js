
module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('User', {
        id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           allowNull: false,
           primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.CHAR,
            allowNull: false,
            default: "active"
        }
    });

    User.associate = function(models) {
        User.belongsTo(models.Roles, {
            foreignKey: 'roleId', // Ensure 'roleId' is added as an attribute to the User model
            as: 'role'
        });
        // User.belongsToMany(models.StandardMaster, { 
        //     through: 'UserStandardMap', 
        //     foreignKey: 'user_id',
        //     as: 'Standards'
        // });
        User.belongsToMany(models.StandardMaster, {
            as: "UserMap", 
            through: {
                model: models.UserStandardMaps,
                unique: false
            },
            foreignKey: 'user_id'
        })
        User.hasMany(models.UserEducationDetails)
    }

    return User
}