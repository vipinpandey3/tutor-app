/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import axios from 'axios'

export const StudentContext = createContext();

export const StudentContextPorvider = (props) => {

    const reqHeader = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiJDJhJDA4JFlRbm1ka3JQcFVoRnJTVDg1TzVyOS5XMlE3NUIxVXRqaEZicElaS2tXZGxqamJDVU8ycnNTIiwiaWF0IjoxNjMzODUyODg5LCJleHAiOjE2MzM4ODE2ODl9.53OAPwSOBwltE8jLLxVMaoiJJxCioFrjJvqFDghfOyo",
          Accept: "appplication/json",
        },
    };

    const [students, setStudents] = useState([])
    const [studentDetails, setStudeDetails] = useState({
        studentDetail: {},
        parentsDetail: {},
        educationDetails: []
    });
    const [feesDetails, setFeesDetails] = useState({
        feesTableHeaders: [
            "Date",
            "Fees Amount",
            "Discount Amount",
            "Paid Fees",
            "Remaining Fees",
        ],
        feesDetailsRow: []
    })
    
    const addStudent = async (studentData) => {
        try {
            return await axios.post('/admin/add-student', studentData)
                .then((result) => {
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch(error) {
            console.log('Error While Fetching Students', error)
        }
    }

    const addParent = async (parentsValue) => {
        try {
            return await axios.post("/admin/add-parent", parentsValue)
                    .then((result) => {
                        if(result.data.resultShort === 'success') {
                            return result.data
                        }
                    })
        } catch(error) {
            console.log("Error while Adding Parent", error)
        }
    }

    const fetchStudents = async () => {
        try {
            return await axios.get('admin/get-students')
                .then((result) => {
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch(error) {
            console.log("Error Fetching Students", error)
        }
    }

    const fetchStudentDetails = async (studentId) => {
        try {
            return await axios.get(`/admin/studentDetails/${studentId}`)
            .then((result) => {
                if(result.data.resultShort === 'success') {
                    return result.data
                }
            }) 
        } catch(error) {
            console.log("Error Fetching Student details", error)
        }
    }

    const storStudentEducationDetails = async(values) => {
        try {
            return await axios.post('/admin/add-studentEducation-details', values)
                .then((result) => {
                    if(result.data.resultShort === 'succes') {
                        return result.data
                    }
                })
        } catch(error) {
            console.log('Error while Saving student Details', error)
        }
    }

    const fetchStudentFeesDetails = async (studentId) => {
        try {
            return await axios.get(`/admin/getFeesDetailsById/${studentId}`)
            .then((result) => {
                if(result.data.resultShort === 'success') {
                    return result.data
                }
            })
        } catch(error) {
            console.log('Error while saving student Details', error)
        }
    }

    const studentFormFields = async() => {
        try {
            return await axios.get('/admin/get-student-formFields')
                .then(result => {
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch(error) {
            console.log("Error while retrieving student form fields", error)
        }
    }

    const fetchParentFields = async(flag) => {
        const postObj = {
            flag: flag
        }
        try {
            return await axios.post('/admin/get-parent-formFields', postObj)
                .then(result => {
                    console.log('result.data.resultShort', result.data.resultShort)
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch (error) {
            console.log("Error while retrieving parent form fields", error)
        }
    }

    const updateParents = async(values) => {
        try {
            return await axios.post('admin/update-parents-details', values)
                .then(result => {
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch (error) {
            console.log("Error while updating parent details", error)
        }
    }

    const fetchEducationFormFields = async() => {
        try {
            return await axios.get('/admin/get-education-formFields')
                .then(result => {
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch(error) {
            console.log('Error while fetching education formfields', error)
        }
    }

    const updateStudentEducationDetails = async(value) => {
        try {
            return await axios.post('/admin/update-education-details', value)
                .then(result => {
                    if(result.data.resultShort === 'success') {
                        return result.data
                    }
                })
        } catch(error) {
            console.log('Error while updating education details', error)
        }
    }

    return (
        <StudentContext.Provider value={{
            // States/Variables
            students,
            studentDetails,
            feesDetails,

            // Function/Methods
            addStudent,
            addParent,
            fetchStudents,
            fetchStudentDetails,
            storStudentEducationDetails,
            fetchStudentFeesDetails,
            studentFormFields,
            fetchParentFields,
            updateParents,
            fetchEducationFormFields,
            updateStudentEducationDetails
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}