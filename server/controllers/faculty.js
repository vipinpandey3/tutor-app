const FeesService = require('../services/feesServices');
const StudentService = require('../services/studentServices');
const ImportService = require('../services/importService');
const attributes = require('../attributes/attributes.json');
const StandardMaster = require('../models/standardMaster');
const { QueryTypes } = require('sequelize');
const OptionServices = require('../services/helperServices/optionServices')
const moment = require('moment');
const SubjectMaster = require('../models/subjectMatser');
const models = require('../models/index')
const { fork } = require('child_process');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {doProcess} = require('../services/queue/queue');

const getFeesDetailsBySearchParam = (seacrchParams) => {
    console.log('Inside the getFeesDetailsBySearchParam function', seacrchParams);
    const feesDetails = [];
    return new Promise((resolve, reject) => {
        FeesService.getFeesBySeacrhParams(seacrchParams)
            .then(feesarray => {
                for (let i = 0; i < feesarray.length; i++) {
                    const element = feesarray[i];
                    StudentService.getStudentById(element.StudentId)
                    .then((student) => {
                        feesDetails.push({
                            studentName: student[0].firstName + " " + student[0].lastName,
                            id: student[0].aadharNo,
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
                console.log('err', err)
                return reject(err);
            })
    })
}

const fileUpload = (req, res, next) => {
    console.log("Inside FileUpload function", JSON.stringify(req.body));
    const inputfile = req.files.file;
    const filetype = req.body.fileType
    const userId = 1;
    const inputFileObject = {
        inputfile: inputfile,
        userid: userId
    }
    return ImportService.SaveFileDetailsInDB(inputFileObject)
        .then(dbFile => {
            const obj = {
                file: dbFile,
                filetype: filetype
            }
            return doProcess(obj, 'import')
            .then(result => {
                const resultObj ={
                    resultShort: "Success",
                    resultLong: "Data is saved in the DB"
                }
                res.status(200).json(resultObj);
            })
            .catch((error) => {
                console.error("Error while uploading excel", error);
                const result = {
                    resultShort: "Failure",
                    resultLong: "Failed to upload file"
                }
                return res.status(400).json(result)
            })
            
            // const forked = fork('../server/services/childProcessService')
            // forked.on('message', (response) => {
            //     console.log(("Upload completed", response));
            // })
            // const result ={
            //     resultShort: "Success",
            //     resultLong: "Data is saved in the DB"
            // }
            // res.status(200).json(result);
            // const obj = {
            //     file: dbFile,
            //     filetype: filetype
            // }
            // forked.send({type: "upload", obj: obj});
            // models.ExcelImport.findByPk(dbFile.id).Examthen(databaseFile => {
            //     let fileObj = fs.readFileSync(databaseFile.filePath);
                
            //     saveExcelDataInDB({data: fileObj})
            //         .then(result => {
            //             return resolve(result)
            //         })
            //         .catch(error => {
            //             return reject(error)
            //         })
            // })
            // ImportService.importExceldata(dbFile)
            //     .then(resultObj => {
            //         const result ={
            //             resultShort: "Success",
            //             resultLong: "Data is saved in the DB"
            //         }
            //         return res.status(200).json(result)
            //     })
            //     .catch(error => {
            //         const result = {
            //             resultShort: "Failure",
            //             resultLong: "Failed to upload file"
            //         }
            //         return res.status(400).json(result)
            //     })
        })
        .catch((error) => {
            console.error("Error while uploading excel", error);
            const result = {
                resultShort: "Failure",
                resultLong: "Failed to upload file"
            }
            return res.status(400).json(result)
        })
}

const createExam = (req, res, next) => {
    console.log('Inside Create Exam Function', JSON.stringify(req.user))
    const reqBody = req.body;
    // const createdBy = req.user.id;
    const createdBy = 1;
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
    });
    const examSubjects = {subjects: subArry};
    return models.Exam.create({examSubjects, timeStart, timeEnd, examDate, marks, examType, academicYear})
            .then((exam) => {
                console.log("Exam created", exam);
                const ExamId = exam.id
                getStandardId(standardId)
                    .then(StandardId => {
                        console.log("standardId", StandardId)
                        const status = 1
                        models.ExamStdMap.create({ExamId, StandardId, createdBy, status})
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
    return models.StandardMaster.findAll({where: {remarks: std}})
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

const getExams = async(req, res, next) => {
    console.log("Inside the Get Exam Function");

    const currentDate = moment().format('YYYY-MM-DD')
    const examsObj = await getAllExam(currentDate);
    getAllExam(currentDate)
    // .then(examsObj => {
        const ExamTableHeader = attributes[2].attributes;
        const ExamNestedTableHeader = attributes[3].attributes;
        const result = {
            resultShort: 'success',
            resultLong: 'Successfully retrieved all the exam',
            exams: examsObj,
            examTableHeader: ExamTableHeader,
            examNestedTableHeader: ExamNestedTableHeader
        }
        return res.status(200).json(result);
    // })
    // .catch(error => {
        // const result = {
        //     resultShort: 'failure',
        //     resultLong: 'Failed to get exam'
        // }
        // return res.json(400).status(result);
    // })
}

const getAllExam = (currentDate) => {
    console.log('Inside getAllExam Function');
    return new Promise((resolve, reject) => {
        const whereQuery = {
            examDate: {
                [Op.gte]: currentDate
            }
        }
        return models.sequelize.query("select esm.id as 'ExamId', e.examSubjects, e.timeStart, e.timeEnd, e.examDate as 'ExamStartDate', sm.remarks as 'Standard', e.academicYear as 'AcademicYear', e.examType as 'ExamType', esm.status as 'ExamStatus' from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join `StandardMaster` sm on esm.standardId = sm.id where esm.status=1 and e.examDate >= ?", 
            { 
                replacements: [currentDate],
                type: QueryTypes.SELECT 
            }
        )
        .then(exams => {
            return resolve(exams)
        })
        .catch(error => {
            console.log("Error", error);
            return reject(error);
        })
    })
}

const getSubjectsByStandard = (req, res) => {
    console.log('Inside the Get Subject By Standard');
    const std = req.params.stdId;
    models.StandardMaster.findAll({where: {remarks: std}})
    .then(standard => {
        const stdId = standard[0].id;
        console.log("stdId", std);
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
    })
    .catch(error => {
        console.log('Error while getting student for ', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Error while getting Standard Id: '
        }
        return res.status(400).json(result); 
    })
}

const disableExam = (req, res) => {
    console.log("Inside disableExam Function");
    const examId = req.body.examId;
    console.log('Examid', examId);
    return models.ExamStdMap.update({status: 0},{where : {ExamId: examId}})
        .then(resultObj => {
            console.log('resultObj', resultObj)
            if(!resultObj) {
                console.log('disableExam Failure', resultObj)
                return res.status(200).json({
                    resultShort: 'failed',
                    resultLong: 'Exam Disable Failed'
                })
            }
            const result = {
                resultShort: "success",
                resultLong: "Successfully deleted Exam",
            }
            return res.status(200).json(result)
        })
        .catch(error => {
            const result = {
                resultShort: "failure",
                resultLong: "Failure while deleting Exam",
            }
            return res.status(400).json(result)
        })
}

const getExamDetailsById = (req, res) => {
    console.log('Inside getExamDetailsById function for: ['+ req.params.examId + '].' );
    const examId = req.params.examId;
    // return new Promise((resolve, reject) => {
        sequelize.query("select esm.id as 'ExamId', e.examSubjects, e.timeStart, e.timeEnd, e.examDate as 'ExamStartDate', sm.remarks as 'Standard', e.academicYear as 'AcademicYear', e.examType as 'ExamType', esm.status as 'ExamStatus' from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join `StandardMaster` sm on esm.standardId = sm.id where e.id = ?",
            { 
                replacements: [examId],
                type: QueryTypes.SELECT 
            }
        )
        .then(examObj => {
            const examSubjectSchedule = examObj[0].examSubjects;
            // let subjectArray = []
            // examSubjectSchedule.subjects.forEach((subjObj => {
            //     subjectArray.push(subjObj.subject)
            // }));
            // examObj[0].subjects = subjectArray;
            return StandardMaster.findAll({where: {remarks: examObj[0].Standard}})
                .then((stdObj) => {
                    const stdId = stdObj[0].id;
                    console.log('stdObj[0].id ============>', stdId)
                    return SubjectMaster.findAll(
                        {
                            where: {
                                stdId: stdId
                            },
                            attributes: ['id', ['subjectName', 'type']]
                        }
                    )
                    .then((subjectObj) => {
                        examObj[0].subjects = JSON.parse(JSON.stringify(subjectObj))
                        delete examObj[0].examSubjects
                        delete examObj[0].timeEnd
                        const result = {
                            resultShort: 'success',
                            resultLong: 'Successfully retrived data with related to the Exam Id: ' + examId,
                            examData: examObj[0]
                        }
                        return res.status(200).json(result);
                    })
                    .catch((error) => {
                        console.log('Error', error)
                        const result = {
                            resultShort: 'failure',
                            resultLong: 'Error getting subjects with Standard ' + stdId,
                            examData: examObj
                        }
                        return res.status(500).json(result);
                    })
                })
                .catch((error) => {
                    console.log('Error', error)
                    const result = {
                        resultShort: 'failure',
                        resultLong: 'Error getting standard for exam with Id: ' + examId,
                        examData: examObj
                    }
                    return res.status(500).json(result);
                })
        })
        .catch((error) => {
            console.log('Error', error)
            const result = {
                resultShort: 'failure',
                resultLong: 'Failure while retriving data with related to the Exam Id: ' + examId,
                examData: examObj
            }
            return res.status(500).json(result);
        })
    // })
}

const getTutorById = (req, res) => {
    console.log('Inside the /getSTutorId/:tutorId route');
    console.log('Inside the getTutorById function');
    const tutorId = req.params.tutorId;
    models.Tutor.findByPk(tutorId, {attributes: ['id','fullName']})
        .then(tutorObj => {
            let tutorDetails = [];
            let object = {};
            if(tutorObj) {
                object.fullName = tutorObj.fullName;
                object.id = tutorObj.id;
                models.TutorAttendence.findAll({where: {TutorId: tutorId}})
                .then((attendenceObj) => {
                    if(attendenceObj.length > 0) {
                        console.log("attendenceObj", attendenceObj)
                        object.lastAttendenceDate = attendenceObj[attendenceObj.length - 1].inTime;
                        object.lastInTime = attendenceObj[attendenceObj.length - 1].attendenceDate;
                        tutorDetails.push(object);
                        const result = {
                            resultShort: 'success',
                            resultLong: "Tutor result fetched successfully",
                            tutorDetails: tutorDetails,
                            attributes: attributes[17].columnsHeader
                        }
                        console.log("Result", result)
                        return res.status(200).json(result)
                    } else {
                        
                        object.lastAttendenceDate = null;
                        object.lastInTime = null
                        tutorDetails.push(object);
                        const result = {
                            resultShort: 'success',
                            resultLong: "Tutor result fetched successfully",
                            tutorDetails: tutorDetails,
                            attributes: attributes[17].columnsHeader
                        }
                        console.log('Result', result)
                        return res.status(200).json(result);
                    }
                })
                .catch(error => {
                    console.log('Error while fetching tutor attendence details', error)
                    const result = {
                        resultShort: "failure",
                        resultLong: "Error while fetching tutor attendence details"
                    }
                    return res.status(500).json(result);
                })
            } else {
                const  result = {
                    resultShort: "success",
                    resultLong: "Somethinf went wrong"
                }
                return res.status(200).json(result)
            }
        })
        .catch(error => {
            console.log('Error while getting User', error)
            const result = {
                resultShort: 'failure',
                resultLong: "Failure in getting tutor with id: " + tutorId
            };
            return res.status(500).status(result);
        })
}

const markTutorAttedence = (req, res) => {
    console.log('Inside the markTutorAttedence function');
    const TutorId = req.body.tutorId;
    const attendenceDate = moment().format('YYYY-MM-DD');
    const inTime = moment().format('HH:mm:ss');
    console.log('attendenceDate', attendenceDate);
    console.log('inTime', inTime);
    return models.TutorAttendence.create({attendenceDate, inTime, TutorId})
        .then(attendenceObj => {
            console.log('attendenceObj', attendenceObj)
            const result = {
                resultShort: 'success',
                resultLong: 'attendence marked for tutor'
            }

            res.status(200).json(result)
        })
        .catch(error => {
            console.log('Failure while marking attendence for tutor', error);
            const result = {
                resultShort: 'failure',
                resultLong: 'Failure while marking attendence for tutor'
            }
            res.status(200).json(result)
        })
}


const getAllTutorAttendence = (req, res) => {
    console.log('Inside getAllTutorAttendence function');
    const tableAttributes = attributes[18].columnsHeader;
    let attendenceDetails = [];
    let attendeceItems = {};
    return models.TutorAttendence.findAll({
        attributes: [['id', 'attendenceId'], 'attendenceDate', 'inTime', 'outTime'],
        include: [
            {
                model: models.Tutor,
                attributes: [['id', 'TutorId'], 'fullName', 'emailId']
            }
        ],
    })
    .then(resultObj => {
        if(resultObj) {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved attendence of all the tutors',
                attendence: resultObj,
                attributes: tableAttributes
            }

            res.status(200).json(result);
        } else {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved attendence of all the tutors',
                attendence: [],
                attributes: tableAttributes
            };
            res.status(200).json(result);
        }
    })
    .catch(error => {
        console.log('Error while retrieving attendence of all the tutors', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Error while retrieving attendence of all the tutors'
        };
        res.status(200).json(result);
    })
    // return models.TutorAttendence.findAll({
    //     attributes: [['id', "AttendenceId"], 'attendenceDate', 'inTime', 'outTime', 'TutorId'],
    // })
    // .then(attendenceArray => {
    //     console.log('attendenceObj ======>', JSON.stringify(attendenceArray))
    //     for(let i = 0; i < attendenceArray.length; i++) {
    //         models.Tutor.findByPk(attendenceArray[i].TutorId, {
    //             attributes: ["id", 'fullName']
    //         })
    //         .then(tutor => {
    //             // console.log("Tutor,", JSON.stringify(tutor))
    //             const newObj = Object.assign(JSON.stringify(tutor), attendenceArray[i])
    //             attendenceDetails.push(newObj);
    //         })
    //     }
    //     console.log("attendenceDetails", attendenceDetails)
    //     // if(attendenceObj) {
    //     //     const result = {
    //     //         resultShort: 'success',
    //     //         resultLong: 'successfully retrieved attendence of all the tutors',
    //     //         attendence: attendenceObj,
    //     //         attributes: tableAttributes
    //     //     };
    //     //     res.status(200).json(result);
    //     // } else {
            // const result = {
            //     resultShort: 'success',
            //     resultLong: 'successfully retrieved attendence of all the tutors',
            //     attendence: [],
            //     attributes: tableAttributes
            // };
            // res.status(200).json(result);
    //     // }
    // })
    // .catch(error => {
        // console.log('Error while retrieving attendence of all the tutors', error)
        // const result = {
        //     resultShort: 'failure',
        //     resultLong: 'Error while retrieving attendence of all the tutors'
        // };
        // res.status(200).json(result);
    // })
}

const markTutorOutTime = (req, res) => {
    console.log('inside markTutorOutTime functions');
    const attendenceId = req.body.attedenceId;
    const outTime = moment().format('HH:mm:ss')
    return models.TutorAttendence.update ({
        outTime: outTime
    }, {
        where: {
            id: attendenceId
        }
    })
    .then(attendenceObj => {
        console.log('Result', attendenceObj)
        const result = {
            resultShort: 'success',
            resultLong: 'Successfully marked tutor outTime'
        }

        res.status(200).json(result)
    })
    .catch(error => {
        console.log('Failed to mark tutor absent', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Failed to mark tutor outTime'
        }

        res.status(200).json(result)
    })

}

const markTutorAbsence = (req, res) => {
    console.log('inside markTutorAbsence function');
    const attendenceId = req.body.attedenceId;
    return models.TutorAttendence.update ({
        inTime: null
    }, {
        where: {
            id: attendenceId
        }
    })
    .then(attendenceObj => {
        console.log('Result', attendenceObj)
        const result = {
            resultShort: 'success',
            resultLong: 'Successfully marked tutor absence'
        }

        res.status(200).json(result)
    })
    .catch(error => {
        console.log('Failed to mark tutor absent', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Failed to mark tutor absence'
        }

        res.status(200).json(result)
    })
}

const getStudentById = (req, res) => {
    console.log('Inside getStudentByIdFunction function');
    const studentId = req.params.studentId;
    console.log('Student Id', studentId)
    models.Student.findByPk(studentId, {
        attributes: ['id', 'firstName', 'lastName']
    })
    .then(studentObject => {
        console.log('studentObject ===========>', JSON.stringify(studentObject))
        let studentDetails = [];
        let object = {};
        models.StudentAttendence.findAll({where: {StudentId: studentId}})
        .then(attendenceObj => {
            if(attendenceObj.length > 0) {
                object.firstName = studentObject.firstName;
                object.id = studentObject.id;
                object.lastAttendenceDate = attendenceObj[attendenceObj.length - 1].attendenceDate;
                object.lastInTime = attendenceObj[attendenceObj.length - 1].inTime;
                studentDetails.push(object)
                const result = {
                    resultShort: 'success',
                    resultLong: "Student result fetched successfully",
                    studentDetails: studentDetails,
                    attributes: attributes[19].columnsHeader
                }
                console.log("Result", result)
                return res.status(200).json(result)
            } else {
                object.fullName = studentObject.firstName + " " + studentObject.lastName
                object.lastAttendenceDate = null;
                object.lastInTime = null;
                object.id = studentObject.id
                studentDetails.push(object);
                console.log('studentDetails', studentDetails)
                const result = {
                    resultShort: 'success',
                    resultLong: "Student result fetched successfully",
                    studentDetails: studentDetails,
                    attributes: attributes[18].columnsHeader
                }
                console.log('Result', result)
                return res.status(200).json(result);
            }
        })
        .catch(error => {
            console.log('Error while getting User', error)
            const result = {
                resultShort: 'failure',
                resultLong: "Failure in getting student with id: " + studentId,
                attributes: attributes[18].columnsHeader
            };
            return res.status(500).status(result);
        })
    })
    .catch(error => {
        console.log('Error while getting User', error)
        const result = {
            resultShort: 'failure',
            resultLong: "Failure in getting student with id: " + studentId
        };
        return res.status(500).status(result);
    })
}

const markStudentAttendence = (req, res) => {
    console.log('Inside the markStudentAttendence function');
    const StudentId = req.body.StudentId;
    console.log('StudentId ****************', StudentId)
    const attendenceDate = moment().format('YYYY-MM-DD');
    const inTime = moment().format('HH:mm:ss');
    const attendenceStatus = 1
    return models.StudentStandardMap.findAll({
        where: {
            status: 'current',
            StudentId: StudentId
        }
    })
    .then(standObj => {
        console.log('standObj standObj standObj', JSON.stringify(standObj))
        let StandardMasterId = standObj[0].StandardId;
        return models.StudentAttendence.create({attendenceDate, inTime,attendenceStatus, StudentId, StandardMasterId})
        .then(attendenceObj => {
            console.log('attendenceObj', attendenceObj)
            const result = {
                resultShort: 'success',
                resultLong: 'attendence marked for student with Id: ' + StudentId
            }
    
            res.status(200).json(result)
        })
        .catch(error => {
            console.log('Failure while marking attendence for student with id: ', StudentId, error);
            const result = {
                resultShort: 'failure',
                resultLong: 'Failure while marking attendence for student with id: ' + StudentId
            }
            res.status(200).json(result)
        })
    })
}


const getAllStudentAttendence = (req, res) => {
    console.log('inside getAllStudentAttendence function');
    const tableAttributes = attributes[20].columnsHeader;
    return models.StudentAttendence.findAll({
        attributes: [['id', 'attendenceId'], 'attendenceDate', 'inTime'],
        include: [
            {
                model: models.Student,
                attributes: [['id', 'StudentId'], 'firstName', 'emailId']
            }
        ]
    })
    .then(resultObj => {
        if(resultObj) {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved attendence of all the students',
                attendence: resultObj,
                attributes: tableAttributes
            };
            res.status(200).json(result);
        } else {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved attendence of all the students',
                attendence: [],
                attributes: tableAttributes
            };
            res.status(200).json(result);
        }
    })
    .catch(error => {
        console.log('Error while retrieving attendence of all the students', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Error while retrieving attendence of all the students'
        };
        res.status(200).json(result);
    })
}

const markStudentAbsence = (req, res) => {
    console.log('Inside markStudentAbsence method');
    const attendenceId = req.body.attedenceId;
    return models.StudentAttendence.update ({
        inTime: null,
        attendenceStatus: 0,
    }, {
        where: {
            id: attendenceId
        }
    })
    .then(attendenceObj => {
        console.log('Result', attendenceObj)
        const result = {
            resultShort: 'success',
            resultLong: 'Successfully marked student absence'
        }

        res.status(200).json(result)
    })
    .catch(error => {
        console.log('Failed to mark student absent', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Failed to mark student absence'
        }

        res.status(200).json(result)
    })
}

const getAllStudentAttendenceById = (req, res) => {
    console.log('Inside getAllStudentAttendenceById function')
    const studentEmail = req.body.studentEmail
    const tableAttributes = attributes[20].columnsHeader;
    return models.StudentAttendence.findAll({
        attributes: [['id', 'attendenceId'], 'attendenceDate', 'inTime'],
        include: [
            {
                model: models.Student,
                attributes: [['id', 'StudentId'], 'firstName', 'emailId'],
                where: {
                    emailId: studentEmail
                },
                required: true
            }
        ]
    })
    .then(resultObj => {
        if(resultObj) {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved all attendence for the student with emailId: ' + studentEmail,
                attendence: resultObj,
                attributes: tableAttributes
            };
            res.status(200).json(result);
        } else {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved attendence of all the students',
                attendence: [],
                attributes: tableAttributes
            };
            res.status(200).json(result);
        }
    })
    .catch(error => {
        console.log('Error while retrieving all attendence for the student', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Error while retrieving all attendence for the student with emailId: ' + studentEmail,
        };
        res.status(200).json(result);
    })
}

const getAllTutorAttendenceById = (req, res) => {
    console.log('inside getAllTutorAttendenceById function');
    const tutorEmail = req.body.tutorEmail;
    const tableAttributes = attributes[18].columnsHeader
    return models.TutorAttendence.findAll({
        attributes: [['id', 'attendenceId'], 'attendenceDate', 'inTime', 'outTime'],
        include: [
            {
                model: models.Tutor,
                attributes: [['id', 'TutorId'], 'fullName', 'emailId'],
                where: {
                    emailId: tutorEmail
                },
                required: true
            }
        ],
    })
    .then(resultObj => {
        if(resultObj) {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved all attendence of the tutors with email: ' + tutorEmail,
                attendence: resultObj,
                attributes: tableAttributes
            }

            res.status(200).json(result);
        } else {
            const result = {
                resultShort: 'success',
                resultLong: 'Tutors is yet mark attendence with email: ' + tutorEmail,
                attendence: [],
                attributes: tableAttributes
            };
            res.status(200).json(result);
        }
    })
    .catch(error => {
        console.log('Error while retrieving attendence of all the tutors', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Error while retrieving attendence of all the tutors'
        };
        res.status(200).json(result);
    })
}

const getAllStudentAttendenceByStudentId = (req, res) => {
    console.log('Inside getAllStudentAttendenceByStudentId function');
    console.log("req.params", req.params);
    const studentId = req.params.studentId
    const tableAttributes = attributes[23].columnsHeader;
    const whereCondition = {
        StudentId: studentId
    }
    return models.StudentAttendence.findAllAttendence(whereCondition)
    .then(resultObj => {
        const currentStudentAttendence = resultObj.reduce((allAtendence, currentAttendence) => {
            let i = 0
            if(currentAttendence.attendenceStatus) {
                allAtendence = allAtendence + 1
            }
            return allAtendence;
        }, 0)
        const totalAbsence = resultObj.reduce((allAtendence, currentAttendence) => {
            let i = 0
            if(!currentAttendence.attendenceStatus) {
                allAtendence = allAtendence + 1
            }
            return allAtendence;
        }, 0)
        if(resultObj) {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved all attendence for the student with id: ' + studentId,
                attendence: resultObj,
                attributes: tableAttributes,
                studentAttendence: {
                    absence: totalAbsence,
                    attendence: currentStudentAttendence
                }
            };
            res.status(200).json(result);
        } else {
            const result = {
                resultShort: 'success',
                resultLong: 'successfully retrieved attendence of all the students',
                attendence: [],
                attributes: tableAttributes
            };
            res.status(200).json(result);
        }
    })
    .catch(error => {
        console.log('Error while retrieving all attendence for the student', error)
        const result = {
            resultShort: 'failure',
            resultLong: 'Error while retrieving all attendence for the student with emailId: ' + studentEmail,
        };
        res.status(200).json(result);
    })

}
module.exports = {
    getFeesDetailsBySearchParam,
    fileUpload,
    createExam,
    getExams,
    disableExam,
    getExamDetailsById,
    getTutorById,
    markTutorAttedence,
    getAllTutorAttendence,
    markTutorAbsence,
    markTutorOutTime,
    getStudentById,
    markStudentAttendence,
    getAllStudentAttendence,
    markStudentAbsence,
    getAllStudentAttendenceById,
    getAllTutorAttendenceById,
    getAllStudentAttendenceByStudentId
}