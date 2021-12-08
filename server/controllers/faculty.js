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
const moment = require('moment');

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
        // if(optionObject.service === "standardData") 
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
    console.log('reqBody', req.body)
    const reqBody = req.body;
    const createdBy = req.user.id;
    const hours = req.body.hours
    const timeStart = moment(reqBody.timeStart, 'HH:mm:ss').format('HH:mm:ss');
    // const timeStart = reqBody.timeStart;
    const timeEnd = moment(timeStart, 'HH:mm').add(hours,'hours').format('HH:mm');
    const examDate = moment(reqBody.examDate).format('YYYY-MM-DD');
    const academicYear = reqBody.academicYear;
    const examTypeName = reqBody.examType;
    const marks = reqBody.marks
    const standardId = req.body.standard;
    const examTypeAttributes = attributes[5].type;
    const subjects = reqBody.subjects;
    console.log('timeEnd', timeEnd)
    console.log('ExamStart', timeStart);
    let subArry = []
    subjects.forEach((sub, index) => {
        const SubjectObj = {
            hours: hours,
            subject: sub,
            date: moment(examDate).add(index, 'd').format('YYYY-MM-DD'),
            marks: marks
        }
        subArry.push(SubjectObj);
    })

    let examType;
    examTypeAttributes.forEach(types => {
        if(types.type === examTypeName) {
            examType = types.id
        }
    })
    console.log('examTypeId', examType)
    const examSubjects = {subjects: subArry};
    return Exam.create({examSubjects, timeStart, timeEnd, examDate, marks, examType, academicYear})
            .then((exam) => {
                console.log("Exam created", exam);
                const ExamId = exam.id
                getStandardId(standardId)
                    .then(standardId => {
                        const status = 1
                        ExamStdMap.create({ExamId, standardId, createdBy, status})
                            .then((examStdObj) => {
                                const result = {
                                    resultShort: "success",
                                    resultLong: 'Exam schedule created for standard' + examStdObj.remarks
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

const getStandardId = (std) => {
    console.log('Inside getStandardId function');
    return StandardMaster.findAll({where: {remarks: std}})
        .then(stdArr => {
            const arry = stdArr
            if(arry && arry.length > 0) {
                const id = arry[0].id
                return arry[0].id;
            } else {
                return false
            }
        })
        .catch(error => {
            return error
        })
}

const getExams = (req, res, next) => {
    console.log("Inside the Get Exam Function");
    getAllExam()
    .then(examsObj => {
        const ExamTableHeader = attributes[2].attributes;
        const ExamNestedTableHeader = attributes[3].attributes
        examsObj.forEach(exam => {
            exam.exapanded = false
        })
        console.log('ExamObj', examsObj);
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
        // sequelize.query("select * from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join StandardMaster sm on esm.standardId = sm.id where esm.status=1;", { type: QueryTypes.SELECT })
        sequelize.query("select esm.id as 'ExamId', e.examSubjects, e.timeStart, e.timeEnd, e.examDate as 'ExamStartDate', sm.remarks as 'Standard', e.academicYear as 'AcademicYear', e.examType as 'ExamType', esm.status as 'ExamStatus' from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join `StandardMaster` sm on esm.standardId = sm.id where esm.status=1;", { type: QueryTypes.SELECT })
        .then(exams => {
            return resolve(exams)
        })
        .catch(error => {
            return reject(error);
        })
    })
}

const getSubjectsByStandard = (req, res) => {
    console.log('Inside the Get Subject By Standard');
    const stdId = req.params.stdId;
    OptionServices.getSubjectOptionForStandard(stdId)
        .then(data => {
            const result = {
                resultShort: 'success',
                resultLong: 'Fetched subject for Standard ' + stdId,
                subjects: data
            }
            return res.status(200).json(result);
        })
        .catch(error => {
            console.log('Error while fetching Subject for ', stdId)
            const result = {
                resultShort: 'failure',
                resultLong: 'Error while getting Subject for ' + stdId,
            }
            return res.status(400).json(result);
        })
}

module.exports = {
    getFeesDetailsBySearchParam,
    fileUpload,
    getExamFormFields,
    createExam,
    getExams,
    getSubjectsByStandard
}