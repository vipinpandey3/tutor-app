import * as types from '../types';
import axiosHelper from "../../utils/AxiosHelper";
import dispatchEngine, { addPayload }  from './actionHelper';

export const fetchAllExams = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const axiosData = await axiosHelper.sendRequest(types.FETCH_EXAMS_URL, "POST", token, postObj);
        const payload = {
            error: false,
            message: axiosData.resultLong,
            loading: false,
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.FETCH_EXAMS, dispatch, types.FETCH_EXAMS_ERROR)
    }
}

export const fetchExamFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const axiosData = await axiosHelper.sendRequest(types.FECTH_EXAM_FORM_FIELDS_URL, "GET", token, null);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showForm: true,
            formDetails: {
                formName: "Create Exam",
                buttonName: "Create",
                editFlag: false
            }
        }

        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.FECTH_EXAM_FORM_FIELDS, dispatch, types.FECTH_EXAM_FORM_FIELDS_ERROR)
    }
}

export const fetchSubjectByStandard = (stdId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: true
        });
        const url = types.FETCH_SUBJECT_URL + stdId;
        const axiosData = await axiosHelper.sendRequest(url,'GET', token, null);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.FETCH_EXAM_SUBJECTS, dispatch, types.FETCH_EXAM_SUBJECTS_ERROR)
    }
}

export const createExam = (examObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const axiosData = await axiosHelper.sendRequest(types.CREATE_EXAM_URL, 'POST', token, examObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong,
            showForm: false,
            formDetails: {
                formName: "",
                buttonName: "",
                editFlag: false
            }
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.ADD_EXAM, dispatch, types.ADD_EXAM_ERROR)
    }
}

export const toggleForm = (formValue) => {
    return async (dispatch) => {
        dispatch({
            type: types.TOGGLE_FORM,
            payload: {
                showForm: formValue.showFlag,
                formName: formValue.formName,
                editFlag: formValue.editFlag,
                buttonName: formValue.buttonName,
            }
        })
    }
};

export const deleteExam = (data) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        const postObj = {
            examId: data.ExamId
        };
        dispatch({
            type: types.SET_LOADING,
            payload: true
        });

        const axiosData = await axiosHelper.sendRequest(types.DELETE_EXAM_URL, 'POST', token, postObj);
        const payload = {
            loading: false,
            error: false,
            message: axiosData.resultLong
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload);
        return await dispatchEngine(axiosAndPayloadData, types.DELETE_EXAM, dispatch, types.DELETE_EXAM_ERROR)
    }
}

export const hideNotification = () => {
    return async(dispatch) => {
        dispatch({
            type: types.HIDE_NOTIFICATION
        })
    }
}