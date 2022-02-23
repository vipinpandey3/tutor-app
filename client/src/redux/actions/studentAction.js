import * as types from "../types";
import axios from 'axios';

export const getStudents = () => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get('admin/get-students')
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch tutor data!');
            }
            return response.data
        }

        try {
            const studentData = await getData();
            if(studentData.resultShort === "success") {
                dispatch({
                    type: types.FETCH_STUDENTS,
                    payload: {
                        loading: false,
                        meesage: studentData.resultLong,
                        data: studentData.students,
                        attributes: studentData.attributes,
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENTS_ERROR,
                    payload: {
                        loading: false,
                        meesage: studentData.resultLong,
                        error: true
                    }
                })
            }
        } catch (error) {
            console.log("Error ****", error)
            dispatch({
                type: types.FETCH_STUDENTS_ERROR,
                payload: {
                    loading: false,
                    meesage: "Error fetching students list",
                    error: true
                }
            })
        }
    }
}

// const setLoading = () => {
//     return dispatch => {
//         dispatch({
//             type: types.SET_LOADING,
//             payload
//         })
//     }
// }