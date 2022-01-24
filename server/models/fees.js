module.exports = function(sequelize, DataTypes) {
    var Fees = sequelize.define('Fees', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        feesAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discount: {
            type: DataTypes. STRING,
            allowNull: false,
            defaultValue: "0.00"
        },
        paidAmount: {
            type: DataTypes.STRING,
            defaultValue: "0.00",
            allowNull: false
        },
        balance: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0.00'
        },
        academicYear: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '2000-2001',
        },
        reamarks: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        }
    }
    );

    Fees.associate = function(models) {
        Fees.belongsTo(models.Student)
    };

    return Fees

}