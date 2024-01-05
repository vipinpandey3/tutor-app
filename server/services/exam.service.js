var Sequelize = require('sequelize');
const attributes = require('../attributes/attributes.json');
const models = require("../models/index")
const Op = Sequelize.Op;
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const {getInputOptions, getSubjectOptionForStandard} = require('./helperServices/optionServices.js')

const examService = {
    getAllExam: async(reqBody, reqUser) => {
        try {
            const ExamTableHeader = attributes[2].attributes;
            const ExamNestedTableHeader = attributes[3].attributes;
            const currentDate = moment().format('YYYY-MM-DD')
            const whereQuery = {
                examDate: {
                    [Op.gte]: currentDate
                }
            }
            const exams = await models.sequelize.query("select esm.id as 'ExamId', e.examSubjects, e.timeStart, e.timeEnd, e.examDate as 'ExamStartDate', sm.remarks as 'Standard', e.academicYear as 'AcademicYear', e.examType as 'ExamType', esm.status as 'ExamStatus' from `Exam` e inner join `ExamStdMap` esm on e.id = esm.ExamId inner join `StandardMaster` sm on esm.standardId = sm.id where esm.status=1 and e.examDate >= ?", 
                { 
                    replacements: [currentDate],
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
            var optionObjPromise = await getInputOptions(examFormFields, reqUser)
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
    
    getSubjectsByStandard: async(reqParam, resUser) => {
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
    }
}

module.exports = examService