
module.exports = function(sequelize, DataTypes) {
    let Roles = sequelize.define('Roles', {
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Roles
}