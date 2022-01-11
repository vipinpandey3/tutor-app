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

    return (
        <TutorContext.Provider
            value={{
                fetchTutorForms,
                addTutors,
                fetchTutors
            }}
        >
            {props.children}
        </TutorContext.Provider>
    )
};