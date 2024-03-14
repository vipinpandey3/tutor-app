import * as types from '../types';
import axiosHelper from "../../utils/AxiosHelper";
import dispatchEngine, { addPayload }  from './actionHelper';

export const fetchAllStandards = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const axiosData = await axiosHelper.sendRequest(types.FETCH_ALL_STANDARDS, "POST", token, postObj);
        console.log("Axios", axiosData)
        const payload = {
            error: axiosData.resultShort,
            message: axiosData.resultLong,
            severity: axiosData.resultShort,
            loading: false,
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.FETCH_CLASSES, dispatch, types.FETCH_CLASSES_ERROR)
    }
}

export const getStudents = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        // const loaderDispatcher = dispatch()
        const axiosData = await axiosHelper.sendRequest(types.GET_STUDENT_URL, 'POST', token, postObj);
        return dispatchEngine(axiosData, types.FETCH_STUDENTS, dispatch, types.FETCH_STUDENTS_ERROR)
    }
}

export const dispatchTeacherDetails = (details) => {
    console.log("This function clicked")
    return {
        type: types.TEACHER_DETAILS,
        payload: details
      };
}

export const createRemarks = (remarks) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const axiosData = await axiosHelper.sendRequest(types.CREATE_STUDENT_REMARKS_URL, "POST", token, remarks);
        const payload = {
            error: axiosData.resultShort,
            message: axiosData.resultLong,
            severity: axiosData.resultShort,
            loading: false,
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.ADD_REMARKS, dispatch, types.ADD_REMARKS_ERROR);
        
    }
}