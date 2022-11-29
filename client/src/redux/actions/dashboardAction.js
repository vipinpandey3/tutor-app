import * as constant from '../types';

import dispatchEngine, {addPayload} from './actionHelper';

import axiosHelper from '../../utils/AxiosHelper';

export const getAllAttendenceOfStudentById = (emailId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} =getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const postObj = {
            studentEmail: emailId
        }
        const axiosData = await axiosHelper.sendRequest(constant.STUDENT_ALL_ATTENDENCE_URL, "POST", token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showStudentTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong,
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.SEARCH_STUDENT_ATTENDENCE_BY_ID, dispatch, constant.SEARCH_STUDENT_ATTENDENCE_BY_ID_ERROR);
    }
}

export const getAllAttendenceOfTutorById = (emailId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} =getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const postObj = {
            tutorEmail: emailId
        }
        const axiosData = await axiosHelper.sendRequest(constant.TUROR_ALL_ATTENDENCE_URL, "POST", token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showTutorTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong,
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.SEARCH_TUTOR_ATTENDENCE_BY_ID, dispatch, constant.SEARCH_TUTOR_ATTENDENCE_BY_ID_ERROR);
    }
}

export const getAllStudentAttendence = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} =getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.ALL_STUDENT_ATTENDENCE_URL, 'GET', token, null);
        const payload =  {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showStudentTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        };
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.FETCH_STUDENT_ATTENDENCE, dispatch, constant.FETCH_STUDENT_ATTENDENCE_ERROR);
    }
}

export const getAllTutorAttendence = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} =getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.ALL_TUTOR_ATTENDENCE_URL, 'GET', token, null);
        const payload =  {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showTutorTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showTutorTable: false,
                showattendenceTable: true
            }
        };
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.FETCH_TUTOR_ATTENDENCE, dispatch, constant.FETCH_TUTOR_ATTENDENCE_ERROR);
    }
}

export const getStudentById = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} =getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const FINAL_URL = `${constant.GET_STUDENT_BY_ID_URL}${id}`
        const axiosData = await axiosHelper.sendRequest(FINAL_URL, 'GET', token, null);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showStudentTables: {
                searchUserInput: true,
                searchAttendeceInput: false,
                showStudentTable: true,
                showattendenceTable: false
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.SEARCH_STUDENT_BY_ID, dispatch, constant.SEARCH_STUDENT_BY_ID_ERROR);
    }
}
export const getTutorById = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} =getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const FINAL_URL = `${constant.GET_TUTOR_BY_ID_URL}${id}`
        const axiosData = await axiosHelper.sendRequest(FINAL_URL, 'GET', token, null);
        const payload ={
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showTutorTables: {
                searchUserInput: true,
                searchAttendeceInput: false,
                showTutorTable: true,
                showattendenceTable: false
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.SEARCH_TUTOR_BY_ID, dispatch, constant.SEARCH_TUTOR_BY_ID_ERROR);
    }
}

export const markStudentAbsence = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            attedenceId: id
        };
        const axiosData = await axiosHelper.sendRequest(constant.MARK_STUDENT_ABSENCE_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showStudentTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.MARK_STUDENT_ABSENCE, dispatch, constant.MARK_STUDENT_ABSENCE_ERROR)
    }
}

export const markStudentAttendenceById = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            StudentId: id
        };
        const axiosData = await axiosHelper.sendRequest(constant.MARK_STUDENT_ATTENDENCE_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showStudentTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.MARK_STUDENT_ATTENDENCE, dispatch, constant.MARK_STUDENT_ATTENDENCE_ERROR)
    }
}

export const markTutorAbsence = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            attedenceId: id
        };
        const axiosData = await axiosHelper.sendRequest(constant.MARK_TUTOR_ABSENCE_URL, "POST", token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showTutorTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        };
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload)
        return await dispatchEngine(axiosAndPayloadData, constant.MARK_TUTOR_ABSENCE, dispatch, constant.MARK_TUTOR_ABSENCE_ERROR)
    }
}

export const markTutorAttendceById = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            tutorId: id
        };
        const axiosData = await axiosHelper.sendRequest(constant.MARK_TUTOR_ATTENDENCE_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showTutorTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.MARK_TUTOR_ATTENDENCE, dispatch, constant.MARK_TUTOR_ATTENDENCE_ERROR)
    }
}

export const toggleStudenAttendenceElements = (postObj) => {
    return async(dispatch) => {
        dispatch({
            type: constant.TOGGLE_STUDENT_ATTENDENCE_ELEMENT,
            payload: {
                searchUserInput: postObj.flag1,
                searchAttendeceInput: postObj.flag2,
                showStudentTable: postObj.flag3,
                showattendenceTable: postObj.flag4
            }
        });
    }
}

export const toggleTutorAttendenceElement = (postObj) => {
    return async(dispatch) => {
        dispatch({
            type: constant.TOGGLE_TUTOR_ATTENDENCE_ELEMENT,
            payload: {
                searchUserInput: postObj.flag1,
                searchAttendeceInput: postObj.flag2,
                showStudentTable: postObj.flag3,
                showattendenceTable: postObj.flag4
            }
        })
    }
}

export const updateTutorAttendence = (id) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            attedenceId: id
        }
        const axiosData = await axiosHelper.sendRequest(constant.UPDATE_TUTOR_ATTENDENCE_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showTutorTables: {
                searchUserInput: false,
                searchAttendeceInput: true,
                showStudentTable: false,
                showattendenceTable: true
            }
        }
        const errorPayload = {
            loading: false,
            error: true,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloadData, constant.UPDATE_TUTOR_ATTENDENCE, dispatch, constant.UPDATE_TUTOR_ATTENDENCE_ERROR)
    }
}