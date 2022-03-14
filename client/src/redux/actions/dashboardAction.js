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

export const getAllTutorAttendence = () => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const getData = async() => {
            const response = await axios.get('/faculty/get_All_Tutor_Attendence');
            if(response.statusText !== 'OK') {
                throw new Error("Error while marking tutor attendence");
            }
            return response.data;
        };

        try {
            const attendenceData = await getData();
            if(attendenceData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_TUTOR_ATTENDENCE,
                    payload: {
                        tutorAttendenceRecord: {
                            attedenceRows: attendenceData.attendence,
                            attendenceTableAttributes: attendenceData.attributes
                        },
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showTutorTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showTutorTable: false,
                            showattendenceTable: true
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_TUTOR_ATTENDENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_TUTOR_ATTENDENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            });
        }
    }
}

export const toggleTutorAttendenceElement = (postObj) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_TUTOR_ATTENDENCE_ELEMENT,
            payload: {
                searchUserInput: postObj.flag1,
                searchAttendeceInput: postObj.flag2,
                showStudentTable: postObj.flag3,
                showattendenceTable: postObj.flag4
            }
        })
    }
}

export const getTutorById = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const getData = async() => {
            const response = await axios.get(`/faculty/getTutorById/${id}`);
            if(response.statusText !== 'OK') {
                throw new Error("Error while getting tutor for attendence!");
            }
            return response.data
        }

        try {
            const tutorData = await getData();
            if(tutorData.resultShort === 'success') {
                dispatch({
                    type: types.SEARCH_TUTOR_BY_ID,
                    payload: {
                        loading: false,
                        error: false,
                        message: tutorData.resultLong,
                        showTutorTables: {
                            searchUserInput: true,
                            searchAttendeceInput: false,
                            showTutorTable: true,
                            showattendenceTable: false
                        },
                        markAttendenceTableData: {
                            rows: tutorData.tutorDetails,
                            attributes: tutorData.attributes
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.SEARCH_TUTOR_BY_ID_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: tutorData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.SEARCH_TUTOR_BY_ID_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}

export const markTutorAttendceById = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const addAttendence = async(postObj) => {
            const response = await axios.post('/faculty/markTutorAttedence', postObj);
            if(response.statusText !== 'OK') {
                throw new Error("Error while marking tutor attendence");
            }
            return response.data;
        }

        try {
            const postObj = {
                tutorId: id
            };
            const attendenceData = await addAttendence(postObj);
            if(attendenceData.resultShort === 'success') {
                dispatch({
                    type: types.MARK_TUTOR_ATTENDENCE,
                    payload: {
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showTutorTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        }
                    }
                });
                return getAllTutorAttendence();
            } else {
                dispatch({
                    type: types.MARK_TUTOR_ATTENDENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.MARK_TUTOR_ATTENDENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
};

export const updateTutorAttendence = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const addAttendence = async(postObj) => {
            const response = await axios.post('/faculty/martkTutorTimeOut', postObj);
            if(response.statusText !== 'OK') {
                throw new Error("Error while updating tutor attendence");
            }
            return response.data;
        }

        try {
            const postObj = {
                attedenceId: id
            }
            const attendenceData = await addAttendence(postObj);
            if(attendenceData.resultShort === 'success') {
                dispatch({
                    type: types.UPDATE_TUTOR_ATTENDENCE,
                    payload: {
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showTutorTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        }
                    }
                });
                return getAllTutorAttendence();
            } else {
                dispatch({
                    type: types.UPDATE_TUTOR_ATTENDENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.UPDATE_TUTOR_ATTENDENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
};

export const markTutorAbsence = (id) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const absenceData = async(postObj) => {
            const response = await axios.post('/faculty/martkTutorAbsence', postObj);
            if(response.statusText !== 'OK') {
                throw new Error("Error while marking student absence");
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
                    type: types.MARK_TUTOR_ABSENCE,
                    payload: {
                        loading: false,
                        error: false,
                        message: attendenceData.resultLong,
                        showTutorTables: {
                            searchUserInput: false,
                            searchAttendeceInput: true,
                            showStudentTable: false,
                            showattendenceTable: true
                        }
                    }
                })
                return getAllTutorAttendence()
            } else {
                dispatch({
                    type: types.MARK_TUTOR_ABSENCE_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.MARK_TUTOR_ABSENCE_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}