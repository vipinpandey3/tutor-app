import { createContext, useEffect, useState } from "react";
import axios from 'axios';

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
            return await axios.post('/admin/add-student', studentData, reqHeader)
                            .then((response) => {
                                return response.data
                            })
        } catch (error) {
            console.log("Error", error)
        }
    }

    const addParent = async (parentsValue) => {
        try {
            return await axios.post('/admin/add-parent', parentsValue, reqHeader)
                        .then((response) => {
                            return response.data;
                        })
        } catch(error) {
            console.log('Error', error);
        }
        // const response = await fetch("http://localhost:5000/admin/add-parent", {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //     method: "POST",
        //     body: JSON.stringify(parentsValue)
        // })

        // const res = response.json();
        // return res;
    }

    const fetchStudents = async () => {
        try {
            return await axios.get('/admin/get-students', reqHeader)
                        .then((response) => {
                            return response.data
                        })
        } catch (error) {
            console.log('Error', error)
        }
    }

    const fetchStudentDetails = async (studentId) => {
        try {
            return await axios.get(`/admin/studentDetails/${studentId}`, reqHeader)
                        .then((response) => {
                            setStudeDetails({
                                studentDetail: response.data.studentDetails,
                                parentsDetail: response.data.parentDetails,
                                educationDetails: response.data.educationDetails
                            });
                            return response.data;
                        })
        } catch (error) {
            console.log('Error', error)
        }
    }

    const storStudentEducationDetails = async(values) => {
        try {
            return await axios.post('/admin/add-studentEducation-details', values, reqHeader)
                            .then((response) => {
                                return response.data;
                            })
        } catch (error) {
            console.log('Error', error)
        }
        // const response = await fetch('http://localhost:5000/admin/add-studentEducation-details', {
        //     headers: {
        //         'Accept': "application/json",
        //         "Content-Type": 'application/json'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify(values)
        // });

        // const res = await response.json();
        // return res;
    }

    const fetchStudentFeesDetails = async (studentId) => {
        try {
            return await axios.get(`/admin/getFeesDetailsById/${studentId}`,reqHeader)
                            .then((response) => {
                                setFeesDetails({
                                    feesTableHeaders: response.data.header,
                                    feesDetailsRow: response.data.fees
                                })
                                return response.data;
                            })
        } catch (error) {
            console.log('Error', error);
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
            fetchStudentFeesDetails
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}