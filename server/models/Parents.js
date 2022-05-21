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

        Parent.createParents = function(parents, where) {
            return models.Parent.findOrCreate({where: where, defaults: parents})
            // .then(result => {
            //     console.log("CreatePanrets result in models", result);
            //     return result;
            // })
            // .catch(error => {
            //     console.log("Error inside model Parents while creaing", error);
            //     return error;
            // })
        }
    };

    return Parent
}