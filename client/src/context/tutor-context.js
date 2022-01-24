import { createContext } from "react";
import axios from 'axios'

export const TutorContext = createContext()
    
export const TutorContextProvider = (props) => {

    const fetchTutorForms = async() => {
        try {
            return await axios.get('/admin/get-tutor-formFields')
                .then(result => {
                    if(result && result.data.resultShort === 'success'){
                        return result.data
                    } else {
                        return result
                    } 
                })
        } catch(e) {
            console.log("Error loading formFields for tutors", e)
        }
    }

    const addTutors = async(values) => {
        try {
            return await axios.post('/admin/add-teacher', values)
                .then((result) => {
                    return result.data
                })
        } catch(error) {
            console.log('Error while adding tutor', error)
        }
    }

    const fetchTutors = async() => {
        try {
            return await axios.get('/admin/get-teachers')
                .then(result => {
                    return result.data
                })
        } catch(error) {
            console.log("Error while getting tutors list", error)
        }
    }

    const getTutorDetails = async(teacherId) => {
        try {
            return await axios.get(`/admin/teachersDetails/${teacherId}`)
                .then(result => {
                    return result.data
                })
        } catch (error) {
            console.log("Error getting tuttor details", error);
        }
    }

    const fetchTutorEducationFormFields = async() => {
        try {
            return await axios.get('/admin/getTutorFormFields')
                .then(result => {
                    return result.data
                })
        } catch (error) {
            console.log("Error while getting education form fields for users", error)
        }
    }

    const addTutorEducation = async(values) => {
        try {
            return await axios.post('/admin/addTutorEducation', values)
            .then(result => {
                return result.data
            })
        } catch (error) {
            console.log("Error While adding tutor education details", error)
        }
    }

    const updateTutorEducationDetail = async(values) => {
        try {
            return await axios.post('/admin/updateTutorEducation', values)
            .then(result => {
                return result.data
            })
        } catch(error) {
            console.log("Error while updating tutor", error)
        }
    }

    return (
        <TutorContext.Provider
            value={{
                fetchTutorForms,
                addTutors,
                fetchTutors,
                getTutorDetails,
                fetchTutorEducationFormFields,
                addTutorEducation,
                updateTutorEducationDetail
            }}
        >
            {props.children}
        </TutorContext.Provider>
    )
};