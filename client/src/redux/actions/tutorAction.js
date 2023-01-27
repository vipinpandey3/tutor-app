import * as constant from '../types';

import dispatchEngine, {addPayload} from './actionHelper';

import axiosHelper from '../../utils/AxiosHelper';

export const getTutors = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.GET_TUTOR_URLS, 'GET', token, null)
        const payload = {
            loading: false
        }

        const errorPayload = {
            loading: true
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return dispatchEngine(axiosAndPayloadData, constant.FETCH_TUTORS, dispatch, constant.FETCH_TUTORS_ERROR);
    }
}

export const addTeacherEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.ADD_TUTOR_EDUCATION_URL, "POST", token, values);
        const payload = {
            title: "Add Education",
            buttonName: "submit",
            editFlag: false,
            showForm: false,
            educationFormFields: []
        }
        const errorPayload = {
            title: "Add Education",
            buttonName: "submit",
            editFlag: false,
            showForm: true
        }
        const axiosAndPayloaddata = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloaddata, constant.ADD_TEACHER_EDUCATION_DETAILS, dispatch, constant.ADD_TEACHER_EDUCATION_DETAILS_ERROR);
    }
}

export const addTutors = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.ADD_TUTOR_URL, 'POST', token, values);
        const payload = {
            showForm: false,
            formDetails: {
                formName: "",
                editFlag: false,
                buttonName: 'Submit',
            },
            formFields: []
        }
        const errorPayload = {
            showForm: true,
            formDetails: {
                formName: "",
                editFlag: false,
                buttonName: 'Submit',
            }
        }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return dispatchEngine(axiosAndPayloadData, constant.ADD_TUTOR, dispatch, constant.ADD_TUTOR_ERROR);
    }
}

export const fetchTutorDetails = (teacherId) => {
    console.log('fetchTutorDetails function called')
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        let FETCH_TUTOR_DETAILS_URL = `${constant.FETCH_TUTOR_DETAILS_URL}/${teacherId}`
        const axiosData = await axiosHelper.sendRequest(FETCH_TUTOR_DETAILS_URL, "GET", token, null);
        return await dispatchEngine(axiosData, constant.FETCH_TUTOR_DETAIL, dispatch, constant.FETCH_TUTOR_DETAIL_ERROR);
    }
}

export const fetchTutorEducationFormFields = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.TUTOR_EDUCATION_FORM_FIELDS_URL, "GET", token, null);
        const payload = {
            title: postObj.title,
            buttonName: postObj.buttonName,
            editFlag: postObj.editFlag,
            showForm: true,
            loading: true
        }
        const errorPayload = {
            title: postObj.title,
            buttonName: postObj.buttonName,
            editFlag: postObj.editFlag,
            showForm: true,
            formFields: []
        }
        const axiosAndPayloaddata = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloaddata, constant.FETCH_TUTOR_EDUCATION_FORMFIELD, dispatch, constant.FETCH_TUTOR_EDUCATION_FORMFIELD_ERROR);
    }
}

export const getTutorForm = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.TUTOR_FORM_FIELD_URL, "GET", token, null);
        const payload = {
            formName: "Add Tutor",
            editFlag: false,
            buttonName: 'Submit',
            showForm: true
        }
        const errorPayload = {
            formName: "Add Tutor",
            editFlag: false,
            buttonName: 'Submit',
            showForm: false,
            formFields: []
        }
        const axiosAndPayloaddata = await addPayload(axiosData, payload, errorPayload);
        return await dispatchEngine(axiosAndPayloaddata, constant.FETCH_TUTOR_FORM, dispatch, constant.FETCH_TUTOR_FORM_ERROR);
    }
}

export const toggleForm = (formValue) => {
    return async (dispatch) => {
        dispatch({
            type: constant.TOGGLE_FORM,
            payload: {
                showForm: formValue.showFlag,
                formName: formValue.formName,
                editFlag: formValue.editFlag,
                buttonName: formValue.buttonName,
            }
        })
    }
}

export const updateTutorEducationDetail = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: constant.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const axiosData = await axiosHelper.sendRequest(constant.UPDATE_TUTOR_EDUCATION_URL, 'POST', token, values);
        const payload =  {
            title: "Add Education",
            buttonName: "submit",
            editFlag: false,
            showForm: false,
       }
        const errorPayload = {
            title: "Update Education",
            buttonName: "Update",
            editFlag: true,
            showForm: true
       }
        const axiosAndPayloadData = await addPayload(axiosData, payload, errorPayload);
        return dispatchEngine(axiosAndPayloadData, constant.UPDATE_TEACHER_EDUCATION_DETAILS, dispatch, constant.UPDATE_TEACHER_EDUCATION_DETAILS_ERROR);
    }
}