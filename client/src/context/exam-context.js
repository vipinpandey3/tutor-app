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

    return (
        <ExamContext.Provider
            value={{
                // Fetch Function Variables
                fetchAllExams,
                fetchExamFormFields,
                fetchSubjectByStandard,
                createExam
            }}
        >
            {props.children}
        </ExamContext.Provider>
    )
}