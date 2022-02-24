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
                throw new Error('Could not fetch students!');
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

export const fetchStudentFormFields = () => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-student-formFields')
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch student form!');
            }
            return response.data
        }

        try {
            const formFieldsData = await getData();
            if(formFieldsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENT_FORM,
                    payload: {
                        studentFormFields: formFieldsData.formFields,
                        formDetails: {
                            formName: "Add Student",
                            buttonName: "Submit",
                            editFlag: false
                        },
                        loading: false,
                        message: formFieldsData.resultLong,
                        showForm: true
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_FORM_ERROR,
                    payload: {
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        },
                        loading: false,
                        error: false,
                        message: formFieldsData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error while getting student form", error)
            dispatch({
                type: types.FETCH_STUDENT_FORM_ERROR,
                payload: {
                    formDetails: {
                        formName: "",
                        buttonName: "",
                        editFlag: false
                    },
                    loading: false,
                    error: false,
                    message: "Error while getting student form"
                }
            })
        }
    }
}

export const toggleForm = (flag) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_FORM,
            payload: flag
        })
    }
}

export const editStudentFormFields = () => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-student-formFields')
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch student form!');
            }
            return response.data
        }

        try {
            const formFieldsData = await getData();
            if(formFieldsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENT_FORM,
                    payload: {
                        studentFormFields: formFieldsData.formFields,
                        formDetails: {
                            formName: "Update Student",
                            buttonName: "Update",
                            editFlag: true
                        },
                        loading: false,
                        message: formFieldsData.resultLong,
                        showForm: true
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_FORM_ERROR,
                    payload: {
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        },
                        loading: false,
                        error: false,
                        message: formFieldsData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error while getting student form", error)
            dispatch({
                type: types.FETCH_STUDENT_FORM_ERROR,
                payload: {
                    formDetails: {
                        formName: "",
                        buttonName: "",
                        editFlag: false
                    },
                    loading: false,
                    error: false,
                    message: "Error while getting student form"
                }
            })
        }
    }
}

export const addStudent = (studentData) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const addData = async() => {
            const response = await axios.post('/admin/add-student', studentData)
            if(response.statusText !== "OK") {
                throw new Error('Could not add student in the database!');
            }
            return response.data;
        }

        try {
            const addStudentData = await addData();
            if(addStudentData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_STUDENT,
                    payload: {
                        loading: false,
                        error: false,
                        message: addStudentData.resultLong,
                        showForm: false,
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        }
                    }
                })
                getStudents()
            } else {
                dispatch({
                    type: types.ADD_STUDENT_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: addStudentData.resultLong,
                        showForm: true
                    }
                })
            }
        } catch (error) {
            console.log("Error adding student in database", error)
            dispatch({
                type: types.ADD_STUDENT_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: "Error adding student in database",
                    showForm: true
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