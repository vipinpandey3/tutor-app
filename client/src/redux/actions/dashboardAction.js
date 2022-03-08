import axios from 'axios';
import * as types from '../types';

export const getAllStudentAttendence = () => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })

        const getData = async() => {
            const response = await axios.get('/faculty/getAllStudentAttendence');
            if(response.statusText !== 'OK') {
                throw new Error("Error while fetching student attendence");
            }
            return response.data;
        };

        try {
            const attendenceData = await getData();
            if(attendenceData.resultShort === "success") {
                console.log("AttendenceData", attendenceData)
                dispatch({
                    type: types.FETCH_STUDENT_ATTENDENCE,
                    payload: {
                        studentAttendenceTableData: {
                            attendenceRows: attendenceData.attendence,
                            attendenceAttributes: attendenceData.attributes
                        },
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showStudentTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_ATTENDENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error in fetchin student attendence ********", error)
            dispatch({
                type: types.FETCH_STUDENT_ATTENDENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}

export const toggleStudenAttendenceElements = (postObj) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_STUDENT_ATTENDENCE_ELEMENT,
            payload: {
                searchUserInput: postObj.flag1,
                searchAttendeceInput: postObj.flag2,
                showStudentTable: postObj.flag3,
                showattendenceTable: postObj.flag4
            }
        });
    }
}

export const getAllAttendenceOfStudentById = (emailId) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async(postObj) => {
            const response = await axios.post('/faculty/getStudentAttendenceById', postObj)
            if(response.statusText !== 'OK') {
                throw new Error("Error while fetching student attendence");
            }
            return response.data;
        }

        try {
            const postObj = {
                studentEmail: emailId
            }
            const attendenceData = await getData(postObj);
            if(attendenceData.resultShort === 'success'){
                dispatch({
                    type: types.SEARCH_STUDENT_ATTENDENCE_BY_ID,
                    payload: {
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showStudentTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        },
                        studentAttendenceTableData: {
                            attendenceRows: attendenceData.attendence,
                            attendenceAttributes: attendenceData.attributes
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.SEARCH_STUDENT_ATTENDENCE_BY_ID_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong,
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.SEARCH_STUDENT_ATTENDENCE_BY_ID_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}

export const getStudentById = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getStudent = async() => {
            const response = await axios.get(`/faculty/getStudentById/${id}`);
            if(response.statusText !== 'OK') {
                throw new Error("Error while fetching student attendence");
            }
            return response.data;
        }

        try {
            const student = await getStudent();
            if(student.resultShort === 'success') {
                dispatch({
                    type: types.SEARCH_STUDENT_BY_ID,
                    payload: {
                        loading: false,
                        error: false,
                        message: student.resultLong,
                        showStudentTables: {
                            searchUserInput: true,
                            searchAttendeceInput: false,
                            showStudentTable: true,
                            showattendenceTable: false
                        },
                        markStudentAttendenceTableData: {
                            rows: student.studentDetails,
                            attributes: student.attributes
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.SEARCH_STUDENT_BY_ID_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: student.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.SEARCH_STUDENT_BY_ID_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
};

export const markStudentAttendenceById = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const addAttendence = async(postObj) => {
            const response = await axios.post('/faculty/markStudentAttendence', postObj);
            if(response.statusText !== 'OK') {
                throw new Error("Error while marking student attendence");
            }
            return response.data;
        }

        try {
            const postObj = {
                StudentId: id
            };
            const attendenceData = await addAttendence(postObj);
            if(attendenceData.resultShort === 'success') {
                dispatch({
                    type: types.MARK_STUDENT_ATTENDENCE,
                    payload: {
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showStudentTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        }
                    }
                });
                return getAllStudentAttendence();
            } else {
                dispatch({
                    type: types.MARK_STUDENT_ATTENDENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.MARK_STUDENT_ATTENDENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
};

export const markStudentAbsence = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const absenceData = async(postObj) => {
            const response = await axios.post('/faculty/mark_student_absence', postObj);
            if(response.statusText !== 'OK') {
                throw new Error("Error while marking student attendence");
            }
            return response.data;
        };

        try {
            const postObj = {
                attedenceId: id
            };
            const attendenceData = await absenceData(postObj);
            if(attendenceData.resultShort === 'success') {
                dispatch({
                    type: types.MARK_STUDENT_ABSENCE,
                    payload: {
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showStudentTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        }
                    }
                })
                return getAllStudentAttendence()
            } else {
                dispatch({
                    type: types.MARK_STUDENT_ABSENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.MARK_STUDENT_ABSENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}