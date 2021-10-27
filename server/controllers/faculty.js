const Student = require('../models/student');
const Fees = require('../models/fees');
const FeesService = require('../services/feesServices');
const StudentService = require('../services/studentServices');
const ImportService = require('../services/importService');
const attributes = require('../attributes/attributes.json');

const getFeesDetailsBySearchParam = (seacrchParams) => {
    console.log('Inside the getFeesDetailsBySearchParam function');
    const feesDetails = [];
    return new Promise((resolve, reject) => {
        FeesService.getFeesBySeacrhParams(seacrchParams)
            .then(feesarray => {
                for (let i = 0; i < feesarray.length; i++) {
                    const element = feesarray[i];
                    StudentService.getStudentById(element.studentId)
                    .then((student) => {
                        feesDetails.push({
                            studentName: student.firstName + " " + student.lastName,
                            id: student.aadharNo,
                            FeesId: element.id,
                            uuid: element.uuid,
                            feesAmount: element.feesAmount,
                            discount: element.discount,
                            paidAmount: element.paidAmount,
                            balance: element.balance,
                            academicYear: element.academicYear,
                            reamarks: element.reamarks,
                            createdAt: element.createdAt,
                            studentId: element.studentId,
                        })
                        return resolve(feesDetails);
                    })
                }
            })
            .catch(err => {
                console.log('err')
                return reject(err);
            })
    })
}

const fileUpload = (req, res, next) => {
    const inputfile = req.files.file;
    const userId = 1;
    const inputFileObject = {
        inputfile: inputfile,
        userid: userId
    }
    return ImportService.SaveFileDetailsInDB(inputFileObject)
        .then(dbFile => {
            ImportService.importExceldata(dbFile)
                .then(resultObj => {
                    const result ={
                        resultShort: "Success",
                        resultLong: "Data is saved in the DB"
                    }
                    return res.status(200).json(result)
                })
                .catch(error => {
                    const result = {
                        resultShort: "Failure",
                        resultLong: "Failed to upload file"
                    }
                    return res.status(400).json(result)
                })
        })
        .catch((error) => {
            const result = {
                resultShort: "Failure",
                resultLong: "Failed to upload file"
            }
            return res.status(400).json(result)
        })
}

module.exports = {
    getFeesDetailsBySearchParam,
    fileUpload
}