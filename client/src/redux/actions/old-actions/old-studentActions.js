// import * as ActionHelper from './actionHelper'
import * as collection from '../../utils/collections';
import * as types from "../types";

import dispatchEngine, { addPayload }  from './actionHelper';

import axios from 'axios';
import axiosHelper from "../../utils/AxiosHelper";

export const getStudents = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get('admin/get-students', {headers: collection.setHeader(token)})
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
                        error: true,
                        severity: "error"
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
                    error: true,
                    severity: "error"
                }
            })
        }
    }
}

export const OldfetchParentFormFields = (flag) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            flag: flag
        }
        const getData = async() => {
            const response = await axios.post('/admin/get-parent-formFields', postObj, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch parent form!');
            }
            return response.data
        }

        try {
            const parentForm = await getData();
            if(parentForm.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_PARENT_FORM,
                    payload: {
                        parentFormFields: parentForm.formFields,
                        loading: false,
                        message: parentForm.resultLong,
                        error: true,
                        showForm: true,
                        severity: "error"
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_PARENT_FORM_ERROR,
                    payload: {
                        loading: false,
                        message: parentForm.resultLong,
                        error: true,
                        showForm: false,
                        severity: "error"
                    }
                })
            }
        } catch (error) {
            console.log("Error while fetching parent form", error)
            dispatch({
                type: types.FETCH_PARENT_FORM_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching parent form",
                    error: true,
                    showForm: false,
                    severity: "error"
                }
            })
        }
    }
}

export const OnefetchStudentFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-student-formFields', {headers: collection.setHeader(token)})
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
                        showForm: true,
                        error: true,
                        severity: "success"
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
                        error: true,
                        message: formFieldsData.resultLong,
                        severity: "error"
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
                    message: error,
                    severity: "error"
                }
            })
        }
    }
}

export const OldfetchEditParentFormFields = (flag) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            flag: flag
        }
        const getData = async() => {
            const response = await axios.post('/admin/get-parent-formFields', postObj, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch parent form!');
            }
            return response.data
        }

        try {
            const parentForm = await getData();
            if(parentForm.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_EDIT_PARENT_FORM,
                    payload: {
                        parentFormFields: parentForm.formFields,
                        loading: false,
                        message: parentForm.resultLong,
                        error: false,
                        showForm: true,
                        formDetails: {
                            formName: "Update Details",
                            buttonTitle: "Update",
                            editFlag: true
                        },
                        severity: "success"
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_EDIT_PARENT_FORM_ERROR,
                    payload: {
                        loading: false,
                        message: parentForm.resultLong,
                        error: true,
                        showForm: false,
                        severity: "error"
                    }
                })
            }
        } catch (error) {
            console.log("Error while fetching parent form", error)
            dispatch({
                type: types.FETCH_EDIT_PARENT_FORM_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching parent form",
                    error: true,
                    showForm: false,
                    severity: "error"
                }
            })
        }
    }
}

export const OnefetchStudentDetails = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const getData = async() => {
            const response = await axios.get(`/admin/studentDetails/${studentId}`, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch student details!');
            }
            return response.data;
        }

        try {
            const studentDetailsData = await getData();
            if(studentDetailsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENTS_DETAILS,
                    payload: {
                        loading: false,
                        message: studentDetailsData.resultLong,
                        error: false,
                        studentDetail: studentDetailsData.studentDetails,
                        parentDetails: studentDetailsData.studentDetails.Parent,
                        educationDetails: studentDetailsData.studentDetails.StudentEducationDetails,
                        studentDetailAttributes: studentDetailsData.studentDetailAttributes,
                        parentDetailsAttributes: studentDetailsData.parentDetailsAttributes,
                        educationDetailsAttributes: studentDetailsData.educationDetailsAttributes
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENTS_DETAILS_ERROR,
                    payload: {
                        loading: false,
                        message: studentDetailsData.resultLong,
                        error: true,
                        
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_STUDENTS_DETAILS_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching student details",
                    error: true,
                    showForm: false
                }
            })
        }
    }
}

export const OnefetchStudentFeesDetails = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get(`/admin/getFeesDetailsById/${studentId}`, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees details!');
            }
            return response.data
        }
        
        try {
            const feesData = await getData();
            if(feesData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENT_FEES_DATA,
                    payload: {
                        error: false, 
                        loading: false,
                        message: feesData.resultLong,
                        feesDetails: {
                            feesTableHeaders: feesData.header,
                            feesDetailsRow: feesData.fees,
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_FEES_DATA_ERROR,
                    payload: {
                        error: true, 
                        loading: false,
                        message: feesData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error while fetching fees", error)
            dispatch({
                type: types.FETCH_STUDENT_FEES_DATA_ERROR,
                payload: {
                    error: true, 
                    loading: false,
                    message: "Error while fetching fees for student with Id: " + studentId
                }
            })
        }
    }
}

export const OnefetchStudentAttendence = (studentId) => {
    return async (dispatch, getState) => {
        const {auth: {token}} = getState();

        const getData = async() => {
            const response = await axios.get(`/faculty/get-student-attendenceById/${studentId}`, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees details!');
            }
            return response.data
        }

        try{
            const attendenceData = await getData();
            if(attendenceData.resultShort === 'success') {
                dispatch({
                    type: types.GET_STUDENT_ATTENDENCE,
                    payload: {
                        error: false, 
                        loading: false,
                        message: attendenceData.resultLong,
                        studentAttendence: {
                            attendence: attendenceData.studentAttendence.attendence,
                            absence: attendenceData.studentAttendence.absence
                        },
                        studentAttendenceTable: {
                            attendenceTableColumns: attendenceData.attributes,
                            attendenceTableRows: attendenceData.attendence,
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.GET_STUDENT_ATTENDENCE_ERROR,
                    payload: {
                        error: true, 
                        loading: false,
                        message: attendenceData.resultLong
                    }
                })
            }
        } catch(error) {
            console.log("Error while fetching student attendence", error)
            dispatch({
                type: types.GET_STUDENT_ATTENDENCE_ERROR,
                payload: {
                    error: true, 
                    loading: false,
                    message: "Error while fetching attendence for student with Id: " + studentId
                }
            })
        }
    }
}

export const OldmarkStudentAbsence = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const absenceData = async(postObj) => {
            const response = await axios.post('/faculty/mark_student_absence', postObj, {headers: collection.setHeader(token)});
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
                // return getAllStudentAttendence()
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

export const OneeditStudentFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-student-formFields', {headers: collection.setHeader(token)})
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
                        showForm: true,
                        severity: "success"
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
                        message: formFieldsData.resultLong,
                        severity: "error"
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
                    message: error,
                    severity: "error"
                }
            })
        }
    }
}

export const OneaddStudent = (studentData) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const addData = async(data) => {
            const response = await axios.post('/admin/add-student', data, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not add student in the database!');
            }
            return response.data;
        }

        try {
            const addStudentData = await addData(studentData);
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
                        },
                        severity: "success"
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
                        showForm: true,
                        severity: "error"
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
                    showForm: true,
                    severity: "error"
                }
            })
        }
    }
}