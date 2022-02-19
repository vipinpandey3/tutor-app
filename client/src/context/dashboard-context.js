import { createContext } from "react";
import axios from 'axios';

export const DashboardContext = createContext();

export const DashboardContextProvider = (props) => {

    const getAllStudentAttendence = async() => {
        try {
            return await axios.get('/faculty/getAllStudentAttendence')
            .then(result => {
                return result.data
            })
        } catch(error) {
            console.log("Error while fetching Student Attendence", error);
        }
    }

    const getAllTutorAttendence = async() => {
        try {
            return await axios.get('/faculty/get_All_Tutor_Attendence')
            .then(result => {
                return result.data
            })
        } catch(error) {
            console.log('Error while fetching tutor attendence', error);
        }
    }

    const searchTutorAttendencebyId = async(id) => {
        try {
            return await axios.get(`/faculty/getTutorAttendenceById/${id}`) 
            .then(result => {
                return result.data
            })
        } catch(error) {
            console.log('Error while getting attendence of student by Id', error)
        }
    }

    const getTutorById = async(id) => {
        console.log('Id', id);
        try {
            return await axios.get(`/faculty/getTutorById/${id}`)
            .then((result) => {
                return result.data;
            })
        } catch(error) {
            console.log('Error while getting attendence of student by Id', error)
        }
    }

    const markTutorAttendceById = async(id) => {
        const postObj = {tutorId: id}
        try {
            return await axios.post('/faculty/markTutorAttedence', postObj)
            .then((result) => {
                return result.data;
            })
        } catch (error) {
            console.log("Error while marking tutor attendence", error);
        }
    }

    const updateTutorAttendence = async(id) => {
        const postObj = {
            attedenceId: id
        }
        try {
            return await axios.post('/faculty/martkTutorTimeOut', postObj)
            .then((result) => {
                return result.data;
            })
        } catch (error) {
            console.log("Error while marking tutor timeOut", error);
        }
    }

    const markTutorAbsence = async(id) => {
        const postObj = {
            attedenceId: id
        }
        try {
            return await axios.post('/faculty/martkTutorAbsence', postObj)
            .then((result) => {
                return result.data;
            })
        } catch (error) {
            console.log("Error while marking tutor absence", error);
        }
    }

    const markStudentAbsence = async(id) => {
        const postObj = {
            attedenceId: id
        };
        try {
            return await axios.post('/faculty/mark_student_absence', postObj)
            .then((result) => {
                return result.data;
            })
        } catch(error) {
            console.log("Error while marking student absence", error);
        }
    }

    const getStudentById = async(id) => {
        try {
            return await axios.get(`/faculty/getStudentById/${id}`)
            .then((result) => {
                return result.data;
            })
        } catch(error) {
            console.log('Error while getting attendence of student by Id', error)
        }
    }

    const markStudentAttendenceById = async(id) => {
        const postObj = {
            StudentId: id
        };
        try{
            return await axios.post('/faculty/markStudentAttendence', postObj)
            .then((result) => {
                return result.data;
            })
        } catch(error) {
            console.log('Error while marjing student attendence')
        }
    }

    const getAllAttendenceOfTutorById = async(emailId) => {
        const postObj = {
            tutorEmail: emailId
        }
        try {
            return await axios.post('/faculty/getTutorAttendenceById', postObj)
            .then((result) => {
                return result.data;
            })
        } catch(error) {
            console.log("Error while finding tutor attendence by emailId", error);
        }
    }

    const getAllAttendenceOfStudentById = async(emailId) => {
        const postObj = {
            studentEmail: emailId
        }
        try {
            return await axios.post('/faculty/getStudentAttendenceById', postObj)
            .then((result) => {
                return result.data;
            })
        } catch(error) {
            console.log("Error while finding tutor attendence by emailId", error);
        }
    }

    return (
        <DashboardContext.Provider value={{
            getAllStudentAttendence,
            getAllTutorAttendence,
            searchTutorAttendencebyId,
            getTutorById,
            markTutorAttendceById,
            markTutorAbsence,
            updateTutorAttendence,
            markStudentAbsence,
            getStudentById,
            markStudentAttendenceById,
            getAllAttendenceOfTutorById,
            getAllAttendenceOfStudentById
        }}>
            {props.children}
        </DashboardContext.Provider>
    )
}