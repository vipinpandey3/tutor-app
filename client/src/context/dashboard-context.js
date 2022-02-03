import { createContext } from "react";
import axios from 'axios';

export const DashboardContext = createContext();

export const DashboardContextProvider = (props) => {

    const refreshPage = (comment) => {
        console.log(comment)
    }

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
            return await axios.get('/faculty/getAllTutorAttendence')
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
        try {
            return await axios.post('/faculty/markTutorAttedence', {tutorId: id})
            .then((result) => {
                return result.data;
            })
        } catch (error) {
            console.log("Error while marking tutor attendence", error);
        }
    }

    return (
        <DashboardContext.Provider value={{
            getAllStudentAttendence,
            getAllTutorAttendence,
            searchTutorAttendencebyId,
            getTutorById,
            markTutorAttendceById,
            refreshPage
        }}>
            {props.children}
        </DashboardContext.Provider>
    )
}