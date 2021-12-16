import {createContext} from 'react'
import axios from 'axios'

export const  ExamContext = createContext();

export const ExamContextProvider = (props) => {

    const fetchAllExams = async() => {
        try{
            return await axios.get('/faculty/get-exams')
                        .then(res => {
                            return res.data
                        })
        } catch(e) {
            console.log(e);
        }
    }

    const fetchExamFormFields = async () => {
        try {
            return await axios.get('/faculty/getExamFormFields')
                        .then(res => {
                            if(res.data.resultShort === 'success') {
                                return res.data
                            }
                        })
        } catch(e) {
            console.log('Error while fetching exam formfields')
        }
    }

    const fetchSubjectByStandard = async (stdId) => {
        try {
            return await axios.get(`/faculty/getSubjects/${stdId}`)
                        .then(res => {
                            if(res.data.resultShort && res.data.resultShort === 'success') {
                                return res.data
                            }
                        })
        } catch(e) {
            console.log('Error', e);
        }
    }

    const createExam = async (examObj) => {
        try {
            return await axios.post('/faculty/create-exam', examObj)
                        .then(res => {
                            if(res.data.resultShort && res.data.resultShort === 'success') {
                                return res.data
                            }
                        })
        } catch(e) {
            console.log('Error while creating exam', e)
        }
    }

    const disableExam = async (data) => {
        console.log('Exam Deletion function', data)
        const postObj = {
            examId: data.ExamId
        }
        try {
            return await axios.post('/faculty/disableExam', postObj)
                .then(result => {
                    if(result.data.resultShort && result.data.resultShort === 'success') {
                        return result.data
                    }
                });
        } catch(e) {
            console.log('Error while deleting exam', e)
        }
    }

    const getExamById = async(id) => {
        console.log('Exam Id', id)
        try {
            return await axios.get(`/faculty/get_Exam_Details/${id}`)
            .then(result => {
                if(result.data.resultShort && result.data.resultShort === 'success') {
                    return result.data
                }
            });
        } catch(e) {
            console.log('Error while Fetching Exam Details', e)
        }
    }

    return (
        <ExamContext.Provider
            value={{
                // Fetch Function Variables
                fetchAllExams,
                fetchExamFormFields,
                fetchSubjectByStandard,
                createExam,
                disableExam,
                getExamById
            }}
        >
            {props.children}
        </ExamContext.Provider>
    )
}