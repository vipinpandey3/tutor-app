
module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('user', {
        id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           allowNull: false,
           primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.CHAR,
            allowNull: false,
            default: "active"
        }
    });

    // User.associate = function(models) {
    // };

    return User
}