module.exports = (sequelize, DataTypes) => {
    const StudentRemark = sequelize.define('StudentRemark', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Students', // Adjust based on your student model name
                key: 'id',
            },
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Make nullable if a remark might not always be linked to a teacher
            references: {
                model: 'Users', // Adjust based on your user model name
                key: 'id',
            },
        },
        remarkText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subjectId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Make nullable if not always subject-specific
            references: {
                model: 'SubjectMasters', // Adjust based on your subject model name
                key: 'id',
            },
        },
    });

    StudentRemark.associate = (models) => {
        // Define associations here
        // For example:
        StudentRemark.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
        StudentRemark.belongsTo(models.User, { foreignKey: 'teacherId', as: 'teacher' });
        StudentRemark.belongsTo(models.SubjectMaster, { foreignKey: 'subjectId', as: 'subject' });
    };

    return StudentRemark;
};
