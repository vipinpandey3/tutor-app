var Sequelize = require('sequelize');
const attributes = require('../attributes/attributes.json');
const models = require("../models/index")
const Op = Sequelize.Op;
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const {getInputOptions, getSubjectOptionForStandard} = require('./helperServices/optionServices.js');

const examService = {
    getAllExam: async(reqBody, reqUser) => {
        try {
            const ExamTableHeader = attributes[2].attributes;
            const ExamNestedTableHeader = attributes[3].attributes;
            const currentDate = moment().format('YYYY-MM-DD');
            let replacements = []
            const whereQuery = {
                examDate: {
                    [Op.gte]: currentDate
                }
            }
            if(reqBody && reqBody.status && reqBody.status.length > 0) {
                replacements.push(reqBody.status)
            }
            const exams = await models.sequelize.query("select esm.id as 'ExamId', e.examSubjects, e.timeStart, e.timeEnd, e.examDate as 'ExamStartDate', sm.remarks as 'Standard', e.academicYear as 'AcademicYear', e.examType as 'ExamType', esm.status as 'ExamStatus' from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join `StandardMaster` sm on esm.standardId = sm.id where esm.status in (?)", 
                { 
                    replacements: replacements,
                    type: QueryTypes.SELECT 
                }
            )
            return {
                message: "All Exams fetched",
                status: true,
                data: {
                    exams: exams,
                    examTableHeader: ExamTableHeader,
                    examNestedTableHeader: ExamNestedTableHeader
                }
            }
        } catch (error) {
            console.log("Error fetching Exams", error)
            return {
                message: "Error fetching Exams",
                status: false,
            }
        }
    },

    getExamFormFields: async(reqBody, reqUser) => {
        try {
            var examFormFields = attributes[4].attributes;
            var optionObjPromise = await getInputOptions(examFormFields, reqUser);
            return {
                message: "All Exams formfields fetch",
                status: true,
                data: optionObjPromise
            }
        } catch (error) {
            return {
                message: "Error fetching Exam formfields",
                status: false,
            }
        }
    },
    
    getSubjectsByStandard: async(reqParam, reqUser) => {
        try {
            console.log('Inside the Get Subject By Standard', reqParam);
            const std = reqParam.stdId;
            const standard = await models.StandardMaster.findAll({where: {remarks: std}});
            const stdId = standard[0].id;
            const data = await getSubjectOptionForStandard(stdId)
            return {
                message: 'Fetched subject for Standard ' + stdId,
                status: true,
                data: data
            }
        } catch (error) {
            console.log("Error getting subject", error)
            return {
                message: "Error getting subject",
                status: false,
            }
        }
    },

    disableExam: async(reqBody, reqUser) => {
        console.log("Inside disableExam Function");
        try {
            const examId = reqBody.examId;
            if(!examId) {
                throw new Error("Exam id is undefined, please try later")
            }
            const resultObj = await models.ExamStdMap.update({status: 0},{where : {ExamId: examId}})
            console.log("resultObj", resultObj)
            if(!resultObj[0]) {
                throw new Error("Error updaing exam status")
            }
            return {
                status: true,
                message: "Updated Exam status to canceled"
            }
        } catch (error) {
            console.log("Error =>", error.message)
            const result = {
                status: false,
                message: error.message
            }
            return result
        }
    },

    createExam: async(reqBody, reqUser) => {
        try {
            console.log('Inside Create Exam Function', JSON.stringify(reqUser))
            // const createdBy = req.user.id;
            const createdBy = 1;
            const hours = reqBody.hours
            const timeStart = moment(reqBody.timeStart, 'HH:mm:ss').format('HH:mm:ss');
            const timeEnd = moment(timeStart, 'HH:mm').add(hours,'hours').format('HH:mm');
            const examDate = moment(reqBody.examDate).format('YYYY-MM-DD');
            const endDate = moment(reqBody.examDate).format('YYYY-MM-DD');
            const academicYear = reqBody.academicYear;
            const examTypeName = reqBody.examType;
            const marks = reqBody.marks
            const standardId = reqBody.standard;
            const examTypeAttributes = attributes[5].type;
            const subjects = reqBody.subjects;
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
            const exam = await models.Exam.create({examSubjects, timeStart, timeEnd, examDate, marks, examType, academicYear, endDate: endDate})
            if(!exam.id) {
                throw new Error("Error creating exam")
            }
            const ExamId = exam.id
            const StandardId = await examService.getStandardId(standardId);
            const status = 1
            const examStdObj = await models.ExamStdMap.create({ExamId, StandardId, createdBy, status})
            return {
                status: true,
                message: "Exam Created",
                data: examStdObj
            }
        } catch (error) {
            console.log("Error creating exams", error);
            const result = {
                status: false,
                message: error.message
            }
            return result
        }
    },

    getStandardId: (std) => {
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
}

module.exports = examService