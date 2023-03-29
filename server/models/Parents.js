module.exports = function(sequelize, DataTypes) {
    let Parent = sequelize.define('Parent', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        fatherName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        motherName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fatherEmailId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fatherAadhar: {
            type: DataTypes.CHAR(12),
            unique: true
        },
        motherAadhar: {
            type: DataTypes.CHAR(12),
            unique: true
        },
        motherEmailId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fatherDob: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW()
        },
        motherdob: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW()
        },
        fatherHighestQualifaction: DataTypes.STRING,
        motherHighestQualification: DataTypes.STRING,
    });

    Parent.associate = function(models) {
        Parent.hasMany(models.Student)

        Parent.findParents = function(where, t) {
            return models.Parent.findAll({where: where}, { transaction: t })
        },

        Parent.createParents = function(parent, t) {
            return models.Parent.create(parent, { transaction: t })
        }
    };

    return Parent
}