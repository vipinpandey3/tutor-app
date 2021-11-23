const FeesService = require('../services/feesServices');
const StudentService = require('../services/studentServices');
const ImportService = require('../services/importService');
const attributes = require('../attributes/attributes.json');
const Exam = require('../models/exam');
const StandardMaster = require('../models/standardMaster');
const ExamStdMap = require('../models/examStdMap');
const { QueryTypes } = require('sequelize');
const sequelize = require('../models/database');
const OptionServices = require('../services/optionServices');

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
    console.log("Inside FileUpload function");
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

const getExamFormFields = (req, res, next) => {
    return new Promise((resolve, reject) => {
        var examFormFields = attributes[4].attributes;
        var optionObjPromise = []
        for (let i = 0; i < examFormFields.length; i++) {
            if(examFormFields[i]['method']) {
                const methodPromise = getInputOptions(examFormFields[i]);
                methodPromise                
                    .then(data => {
                        examFormFields[i].option = data
                    })
                    .catch((error) => {
                        console.log("Error from MadePromise function", error)
                        examFormFields[i].option = [];
                    })
                optionObjPromise.push(methodPromise)
            }
        }
        Promise.all(optionObjPromise)
            .then(data => {
                return resolve(examFormFields);
            })
            .catch((error) => {
                return reject(error);
            })
    })
}

const getInputOptions = (optionObject) => {
    console.log('Inside the GetInputOption for optionObject with method', optionObject.method);
    return new Promise((resolve, reject) => {
        // if(optionObject.service === "standardData") {
            OptionServices[optionObject.method]()
                .then(data => {
                    return resolve(data)
                })
                .catch(error => {
                    console.log('Error', error);
                    return reject(error)
                })
        // } else if(optionObject.service) {

        // }
    })
}

const createExam = (req, res, next) => {
    console.log('Inside Create Exam Function')
    const reqBody = req.body;
    const createdBy = req.user.id;
    const examSubjects = {subjects: reqBody.subjects};
    const timeStart = reqBody.timeStart
    const timeEnd = reqBody.timeEnd;
    const examDate = reqBody.examDate;
    const academicYear = reqBody.academicYear;
    const examType = reqBody.examType;
    const marks = reqBody.marks
    const standardId = req.body.std;
    console.log("ReqBody", reqBody)
    return Exam.create({examSubjects, timeStart, timeEnd, examDate, marks, examType, academicYear})
            .then((exam) => {
                console.log("Exam created", exam);
                const ExamId = exam.id
                StandardMaster.findByPk(standardId)
                    .then((std) => {
                        const status = 1
                        ExamStdMap.create({ExamId, standardId, createdBy, status})
                        .then((examStdObj) => {
                            console.log("Exam Standard Map Created", examStdObj);
                            const result = {
                                resultShort: "success",
                                resultLong: 'Exam schedule created for standard' + std.remarks
                            };
                            return res.status(200).json(result)
                        })
                        .catch(error => {
                            console.log('Eror in creating ExamSTDMap')
                            console.log('Error', error)
                            const result = {
                                resultShort: "Failure",
                                resultLong: "Failed to create exam schedule"
                            };
                            return res.status(400).json(result)
                        })
                    })
                    .catch(error => {
                        console.log("Error getting Standard", error)
                        const result = {
                            resultShort: "Failure",
                            resultLong: "Failed to create exam schedule"
                        };
                        return res.status(400).json(result)
                    })
            }) 
            .catch(error => {
                console.log("Error creating Exam entry in database", error)
                const result = {
                    resultShort: "Failure",
                    resultLong: "Failed to create exam schedule"
                };
                return res.status(400).json(result)
            })   
};

const getExams = (req, res, next) => {
    console.log("Inside the Get Exam Function");
    getAllExam()
    .then(examsObj => {
        const ExamTableHeader = attributes[2].attributes;
        const ExamNestedTableHeader = attributes[3].attributes
        const result = {
            resultShort: 'success',
            resultLong: 'Successfully retrieved all the exam',
            exams: examsObj,
            examTableHeader: ExamTableHeader,
            examNestedTableHeader: ExamNestedTableHeader
        }
        return res.status(200).json(result);
    })
    .catch(error => {
        const result = {
            resultShort: 'failure',
            resultLong: 'Failed to get exam'
        }
        return res.json(400).status(result);
    })
}

const getAllExam = () => {
    console.log('Inside getAllExam Function');
    return new Promise((resolve, reject) => {
        // ExamStdMap.findAll({
        //     logging: console.log,
        //     where: {
        //         status: 1,
        //     },
        //     incude: [
        //         {
        //             model: Exam,
        //         },
        //         {
        //             model: StandardMaster
        //         }
        //     ]
        // })
        // sequelize.query("select * from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join StandardMaster sm on esm.standardId = sm.id where esm.status=1;", { type: QueryTypes.SELECT })
        sequelize.query("select esm.id as 'ExamId', e.examSubjects, e.timeStart, e.timeEnd, e.examDate as 'ExamStartDate', sm.remarks as 'Standard', e.academicYear as 'AcademicYear', e.examType as 'ExamType', esm.status as 'ExamStatus' from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join `StandardMaster` sm on esm.standardId = sm.id where esm.status=1;", { type: QueryTypes.SELECT })
        .then(exams => {
            console.log('Exams', exams);
            return resolve(exams)
        })
        .catch(error => {
            return reject(error);
        })
    })
}

module.exports = {
    getFeesDetailsBySearchParam,
    fileUpload,
    getExamFormFields,
    createExam,
    getExams
}