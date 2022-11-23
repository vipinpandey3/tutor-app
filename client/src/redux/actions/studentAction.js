// import * as ActionHelper from './actionHelper'
import * as collection from '../../utils/collections';
import * as types from "../types";

import dispatchEngine, { addPayload }  from './actionHelper';

import axios from 'axios';
import axiosHelper from "../../utils/AxiosHelper";

export const OnegetStudents = () => {
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

export const getStudents = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        // const loaderDispatcher = dispatch()
        const axiosData = await axiosHelper.sendRequest(types.GET_STUDENT_URL, 'GET', token, null);
        return dispatchEngine(axiosData, types.FETCH_STUDENTS, dispatch, types.FETCH_STUDENTS_ERROR)
    }
}

export const fetchStudentFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const axiosData = await axiosHelper.sendRequest(types.GET_STUDENT_FORMFIELDS_URL, 'GET', token, null);
        const payload = {
            formDetails: {
                formName: "Add Student",
                buttonName: "Submit",
                editFlag: false
            },
            loading: false,
            message: axiosData.resultLong,
            showForm: true,
            error: true,
            severity: "success"
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload)
        return dispatchEngine(axiosAndPayloadData, types.FETCH_STUDENT_FORM, dispatch, types.FETCH_STUDENT_FORM_ERROR);
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

export const toggleForm = (flag) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_FORM,
            payload: flag
        })
    }
}

export const editStudentFormFields = () => {
    console.log('In new editStudentFormFields function')
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(types.GET_STUDENT_FORMFIELDS_URL, 'GET', token, null);
        const payload = {
            formDetails: {
                formName: "Update Student",
                buttonName: "Update",
                editFlag: true
            },
            loading: false,
            message: axiosData.resultLong,
            showForm: true,
            severity: "success"
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload)
        return dispatchEngine(axiosAndPayloadData, types.FETCH_STUDENT_FORM, dispatch, types.FETCH_STUDENT_FORM_ERROR);
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

export const addStudent = (studentData) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(types.ADD_STUDENT_URL, 'POST', token, studentData);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showForm: false,
            formDetails: {
                formName: "",
                buttonName: "",
                editFlag: false
            },
            severity: "success"
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: "Error adding student in database",
            showForm: true,
            severity: "error"
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload)
        return dispatchEngine(axiosAndPayloadData, types.ADD_STUDENT, dispatch, types.ADD_STUDENT_ERROR)
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

export const toggleUploadSection = (flag) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_IMPORT,
            payload: flag
        })
    }
}

export const uploadFile = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const uploadData = async(postObj) => {
            const response = await axios.post('/faculty/uploadFile', postObj, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Error uploading fees data!');
            };
            return response.data
        }

        try {
            postObj.type = 1;
            const uplaodedData = await uploadData(postObj);
            if(uplaodedData) {
                dispatch({
                    type: types.UPLOAD_FILE,
                    payload: {
                        error: false,
                        loading: false,
                        message: uplaodedData.resultLong,
                        showFileImport: false,
                        severity: "success"
                    }
                })
            } else {
                dispatch({
                    type: types.UPLOAD_FILE_ERROR,
                    payload: {
                        error: true,
                        loading: false,
                        message: uplaodedData.resultLong,
                        severity: "error"
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.UPLOAD_FILE_ERROR,
                payload: {
                    error: true,
                    loading: false,
                    message: error,
                    severity: "error"
                }
            })
        }
    }
}

// export const updateStudent = () => {
//     return async(dispatch) => {
//         const updateData = async() => {
//             const response = await axios.post('')
//         }
//     }
// }

export const fetchParentFormFields = (flag) => {
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

export const fetchEditParentFormFields = (flag) => {
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
            console.log("collection.setHeader(token)", collection.setHeader(token))
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

export const fetchStudentDetails = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        let FETCH_STUDENT_DETAILS_URL = `/${types.FETCH_STUDENT_DETAILS_URL}${studentId}`;
        const axiosData = await axiosHelper.sendRequest(FETCH_STUDENT_DETAILS_URL, 'GET', token, null)
        let payload = {
            loading: false,
            message: axiosData.resultLong,
            error: false,
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload)
        return dispatchEngine(axiosAndPayloadData, types.FETCH_STUDENTS_DETAILS, dispatch, types.FETCH_STUDENTS_DETAILS_ERROR)
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

export const addParentDetails = (parentsValue) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const addData = async() => {
            const response = await axios.post("/admin/add-parent", parentsValue, {headers: collection.setHeader(token)});
            if(response.statusText !== 'OK') {
                throw new Error("Error while adding parent Details")
            }
            return response.data
        }

        try {
            const parentData = await addData();
            if(parentData.resultShort === "success") {
                dispatch({
                    type: types.ADD_PARENT_DATA,
                    payload: {
                        showForm: false,
                        error: false,
                        message: parentData.resultLong,
                        loading: false,
                        severity: "success"
                    }
                });
                fetchStudentDetails()
            } else {
                dispatch({
                    type: types.ADD_PARENT_DATA_ERROR,
                    payload: {
                        showForm: true,
                        error: true,
                        message: parentData.resultLong,
                        loading: false,
                        severity: "error",
                    }
                }) 
            }
        } catch (error) {
            dispatch({
                type: types.ADD_PARENT_DATA_ERROR,
                payload: {
                    showForm: false,
                    error: true,
                    loading: false,
                    message: "Error while adding student Parent",
                    severity: "error"
                }
            })
        }
    }
}

export const fetchStudentEducationFormfields = (editObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        console.log(token);
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-education-formFields',{headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch education form!');
            }
            return response.data
        };

        try {
            const educationFormFieldData = await getData()
            console.log("educationFormFieldData", educationFormFieldData)
            if(educationFormFieldData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_EDUCATION_FORM,
                    payload: {
                        loading: false,
                        message: educationFormFieldData.resultLong,
                        error: true,
                        severity: "success",
                        showForm: true,
                        formFields: {
                            educationFormFields: educationFormFieldData.formFields
                        },
                        formDetails: {
                            formName: editObj.formName,
                            buttonTitle: editObj.buttonTitle,
                            editFlag: editObj.editFlag
                        },

                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_EDUCATION_FORM_ERROR,
                    payload: {
                        error: true,
                        loading: false,
                        message: educationFormFieldData.resultLong,
                        showForm: false
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_EDUCATION_FORM_ERROR,
                payload: {
                    error: true,
                    loading: false,
                    message: "Error while fetching Education formfields",
                    showForm: false
                }
            })
        }
    }
}

export const addStudeEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const addData = async() => {
            const response = await axios.post('/admin/add-studentEducation-details', values, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not add student education details!');
            }
            return response.data;
        };

        try {
            const educationData = await addData();
            if(educationData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_STUDENT_EDUCATION_DATA,
                    payload: {
                        showForm: false,
                        message: educationData.resultLong,
                        error: false,
                        formDetails: {
                            formName: "",
                            buttonTitle: "",
                            editFlag: false
                        },
                        severity: "success",
                    }
                })
                fetchStudentDetails();
            } else {
                dispatch({
                    type: types.ADD_STUDENT_EDUCATION_DATA_ERROR,
                    payload: {
                        loading: false,
                        message: educationData.resultLong,
                        error: true,
                        showForm: true,
                        severity: "error"
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.ADD_STUDENT_EDUCATION_DATA_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching student education details",
                    error: true,
                    showForm: false,
                    severity: "error"
                }
            })
        }
    }
};

export const updateEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: [token]} = getState
        const updateData = async () => {
            const response = await axios.post('/admin/update-education-details', values, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees details!');
            }
            return response.data
        }

        try {
            const updatedData = await updateData();
            if(updatedData.resultShort === 'success') {
                dispatch({
                    type: types.UPDATE_STUDENT_EDUCATION_DETAILS,
                    payload: {
                        showForm: false,
                        error: false,
                        message: updatedData.resultLong,
                        loading: false,
                        formDetails: {
                            formName: "",
                            buttonTitle: "",
                            editFlag: false
                        },
                        severity: "succes"
                    }
                })
            } else {
                dispatch({
                    type: types.UPDATE_STUDENT_EDUCATION_DETAILS_ERROR,
                    payload: {
                        showForm: true,
                        error: true,
                        message: updatedData.resultLong,
                        loading: false,
                        severity: "error"
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.UPDATE_STUDENT_EDUCATION_DETAILS_ERROR,
                payload: {
                    showForm: true,
                    error: true,
                    message: error,
                    loading: false,
                    severity: "error"
                }
            })
        }
    }
}

export const fetchStudentFeesDetails = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        let STUDENT_FEES_DATA_URL = `/${types.FETCH_STUDENT_FEES_URL}${studentId}`;
        const axiosData = await axiosHelper.sendRequest(STUDENT_FEES_DATA_URL, 'GET', token, null);
        const payload = {
            error: false, 
            loading: false,
            message: axiosData.resultLong,
        }
        const errorPayload = {
            error: true, 
            loading: false,
            message: "Error while fetching fees for student with Id: " + studentId
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return dispatchEngine(axiosAndPayloadData, types.FETCH_STUDENT_FEES_DATA, dispatch, types.FETCH_STUDENT_FEES_DATA_ERROR)
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

export const fetchStudentAttendence = (studentId) => {
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

export const markStudentAbsence = (id) => {
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

export const hideNotification = () => {
    return async(dispatch) => {
        console.log("Hide notification button clicked");
        dispatch({
            type: types.HIDE_NOTIFICATION
        })
    }
}

// export const socketConnect = () => {
//     const socket = io.connect('http://localhost:4000')
//     socket.on('upload_excel',(socket)=> {
//         console.log('socket ==========>', socket)
//     })
// }

// const setLoading = () => {
//     return dispatch => {
//         dispatch({
//             type: types.SET_LOADING,
//             payload
//         })
//     }
// }