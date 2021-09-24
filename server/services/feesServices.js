const moment = require('moment');
const Fees = require('../models/fees');
const StudentService = require('./studentServices');
const GenericAction = require('./GenericActions');
const path = require('path');
const FacultyController = require('../controllers/faculty');

const Student = require('../models/student');

const getFeesBySeacrhParams = (seacrhParams) => {
    return new Promise((resolve, reject) => {
        Fees.findAll({where: {uuid: seacrhParams}})
        .then((fees) => {
            return resolve(fees);
        })
        .catch(err => {
            console.log('err', err);
            return reject(err);
        })
    })
}

const getFeesForReciept = (feesUUID) => {
    return Fees.findAll({where : { uuid: feesUUID}})
        .then(fees => {
            return fees[0]
        })
        .catch(err => {
            console.log('err', err);
            return err
        })
}

const getUserDetails = (studentId) => {
    return Student.findByPk(studentId)
        .then(student => {
            return student
        })
        .catch(err => {
            return err
        })
}


const downloadFeesReciept = (uuid) => {

    const templatePath = path.join(__dirname, '../templates/feesRecieptTemplate.html');
    const fileName = 'Fees reciept.pdf'
    return getFeesForReciept(uuid)
        .then(fees => {
            return getUserDetails(fees.studentId)
                .then(student => {
                    return GenericAction.getHTMLFromFile(templatePath)
                    .then(feesHTML => {
                            feesHTML = feesHTML.replace(/DOWNLOAD_DATE/g, moment().format('l'));
                            feesHTML = feesHTML.replace(/STUDENT_NAME/g, student.firstName + " " + student.lastName);
                            feesHTML = feesHTML.replace(/STUDENT_ID/g, student.id);
                            feesHTML = feesHTML.replace(/STUDENT_ADDRESS/g, student.address);
                            feesHTML = feesHTML.replace(/STANDARD_FEES/g, fees.stdFees ? fees.stdFees : 'Xth');
                            feesHTML = feesHTML.replace(/ACADEMIC_YEAR/g, fees.academinYear ? fees.academinYear : '2021-2022');
                            feesHTML = feesHTML.replace(/PAYMENT_TYPE/g, fees.paymentType ? fees.paymentType : 'Cash');
                            feesHTML = feesHTML.replace(/PAYMENT_DATE/g, fees.paymentDate ? fees.paymentDate : '23-09-2021');
                            feesHTML = feesHTML.replace(/FEES_AMOUNT/g, fees.feesAmount);
                            feesHTML = feesHTML.replace(/FEES_DISCOUNT/g, fees.discount);
                            feesHTML = feesHTML.replace(/FEES_DESCRIPTION/g, fees.reamarks ? fees.reamarks : '-');
                            feesHTML = feesHTML.replace(/PAID_AMOUNT/g, fees.paidAmount);

                            return GenericAction.generatePDF(fileName, feesHTML)
                                .then(path => {
                                    return Promise.resolve(path)
                                })
                                .catch(err => {
                                    return Promise.reject({
                                    resultShort: "failure",
                                    resultLong: "Path Not found"
                                    })
                                });
                        })
                })
        })
} 


module.exports = {
    getFeesBySeacrhParams,
    downloadFeesReciept
}