const Student = require('../models/student');
const models = require('../models')

const getStudentById = (id) => {
    console.log("inside getStudentById function", id)
    return new Promise((resolve, reject) => {
        models.Student.findAll({where: {id: id}})
            .then(student => {
                console.log("Result", student)
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