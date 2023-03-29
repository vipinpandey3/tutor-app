
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
        },
        status: {
            type: DataTypes.CHAR,
            allowNull: false,
            default: "active"
        }
    })

    Student.associate = function(models) {
        Student.hasMany(models.Fees, {foreignKey: "StudentId"})
        Student.belongsTo(models.Parent)
        Student.hasMany(models.StudentEducationDetails, {foreignKey: "StudentId"});
        Student.hasMany(models.StudentAttendence, {foreignKey: "StudentId"});
        Student.belongsToMany(models.StandardMaster, {
            as : "StudentMap",
            foreignKey: "StudentId",
            through: {
                model: models.StudentStandardMap,
                unique: false
            }
        })

        Student.STUDENT_STATUS_ACTIVE_VALUE = 'Active';

        Student.getStudenByCondition = function(whereQuery) {
            return models.Student.findOne({
                where: whereQuery
            })
        };

        Student.createStudents = function(student, t) {
            return models.Student.create(student,
            { transaction: t })
        }

        Student.findStudent = function(whereQuery, t) {
            return models.Student.findAll({where: whereQuery}, {transaction: t});
        }

        Student.getAllStudentAndTheirAttendence = function() {
            console.log('Inside the models getAllStudentAndTheirAttendence function');
            return models.Student.findAll({
                where: {
                    status: Student.STUDENT_STATUS_ACTIVE_VALUE
                },
                include: [
                    {
                        model: models.StandardMaster,
                        as: "StudentMap",
                        through: {
                            where: {
                                status: "current"
                            }
                        }
                    },
                    {
                        model: models.StudentAttendence,
                        required: true
                    }
                ]
            })
        }
    };

    return Student
}