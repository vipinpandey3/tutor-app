import * as collection from '../../utils/collections';
import * as types from "../types";

import dispatchEngine, { addPayload }  from './actionHelper';

import axios from 'axios';
import axiosHelper from "../../utils/AxiosHelper";

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

export const toggleForm = (flag) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_FORM,
            payload: flag
        })
    }
}

export const editStudentFormFields = () => {
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
    console.log('fetchParentFormFields fetchParentFormFields')
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const postObj = {
            flag: flag
        }
        const axiosData = await axiosHelper.sendRequest(types.FETCH_PARENT_FORM_FIELDS_URL, "POST", token, postObj);
        const payload = {
            loading: false,
            message: axiosData.resultLong,
            error: true,
            showForm: true,
            severity: "error"
        };
        const errorPayload = {
            loading: false,
            message: axiosData.resultLong,
            error: true,
            showForm: false,
            severity: "error"
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, types.FETCH_PARENT_FORM, dispatch, types.FETCH_PARENT_FORM_ERROR)
    }
}

export const fetchEditParentFormFields = (flag) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            flag: flag
        }
        const axiosData = await axiosHelper.sendRequest(types.FETCH_PARENT_FORM_FIELDS_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            message: axiosData.resultLong,
            error: false,
            showForm: true,
            formDetails: {
                formName: "Update Details",
                buttonTitle: "Update",
                editFlag: true
            },
            severity: "success"
        };
        const errorPayload = {
            oading: false,
            message: axiosData.resultLong,
            error: true,
            showForm: false,
            severity: "error"
        };
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, types.FETCH_EDIT_PARENT_FORM, dispatch, types.FETCH_EDIT_PARENT_FORM_ERROR)
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

export const addParentDetails = (parentsValue) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const axiosData = await axiosHelper.sendRequest(types.ADD_PARENT_URL, "POST", token, parentsValue)
        const payload = {
            showForm: false,
            error: false,
            message: axiosData.resultLong,
            severity: "success",
            loading: false
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return dispatchEngine(axiosAndPayloadData, types.ADD_PARENT_DATA, dispatch, types.ADD_PARENT_DATA_ERROR)
    }
}

export const fetchStudentEducationFormfields = (editObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(types.GET_EDUCATION_FORMFIELDS_URL, "GET", token, null);
        const payload = {
            loading: false,
            message: axiosData.resultLong,
            error: true,
            severity: "success",
            showForm: true,
            formDetails: {
                formName: editObj.formName,
                buttonTitle: editObj.buttonTitle,
                editFlag: editObj.editFlag
            },
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        console.log("axiosAndPayloadData", axiosAndPayloadData);
        return dispatchEngine(axiosAndPayloadData, types.FETCH_EDUCATION_FORM, dispatch, types.FETCH_EDUCATION_FORM_ERROR);
    }
}

export const addStudeEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const axiosData = await axiosHelper.sendRequest(types.ADD_STUDENT_EDUCATION_DETAILS_URL, "POST", token, values);
        const payload = {
            showForm: false,
            message: axiosData.resultLong,
            error: false,
            formDetails: {
                formName: "",
                buttonTitle: "",
                editFlag: false
            },
            severity: "success"
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.ADD_STUDENT_EDUCATION_DATA, dispatch, types.ADD_STUDENT_EDUCATION_DATA_ERROR);
    }
}

export const updateEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const axiosData = await axiosHelper.sendRequest(types.UPDATE_EDUCATION_DETAIL_URL, "POST", token, values);
        const payload = {
            showForm: false,
            error: false,
            message: axiosData.resultLong,
            loading: false,
            formDetails: {
                formName: "",
                buttonTitle: "",
                editFlag: false
            },
            severity: "succes"
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.UPDATE_STUDENT_EDUCATION_DETAILS, dispatch, types.UPDATE_STUDENT_EDUCATION_DETAILS_ERROR)
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

export const fetchStudentAttendence = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        const STUDENT_ATTENDENCE_URL = `/${types.FETCH_STUDENT_ATTENDENCE_URL}${studentId}`;
        const axiosData = await axiosHelper.sendRequest(STUDENT_ATTENDENCE_URL, 'GET', token, null);
        const payload = {
            error: false, 
            loading: false,
            message: axiosData.resultLong,
        }
        const errorPayload = {
            error: true, 
            loading: false,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return dispatchEngine(axiosAndPayloadData, types.GET_STUDENT_ATTENDENCE, dispatch, types.GET_STUDENT_ATTENDENCE_ERROR)
    }
}

export const markStudentAbsence = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        const postObj = {
            attedenceId: id
        };
        const axiosData = await axiosHelper.sendRequest(types.MARK_STUDENT_ABSENCE_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return dispatchEngine(axiosAndPayloadData, types.MARK_STUDENT_ABSENCE, dispatch, types.MARK_STUDENT_ABSENCE_ERROR);
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