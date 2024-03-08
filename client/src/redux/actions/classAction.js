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
    console.log("postObj", postObj);
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