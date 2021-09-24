const Student = require('../models/student');

const getStudentById = (id) => {
    return new Promise((resolve, reject) => {
        Student.findByPk(id)
            .then(student => {
                return resolve(student)
            })
            .catch(err => {
                console.log('err', err);
                return reject(err);
            })
    })
}

module.exports = {
    getStudentById,
}