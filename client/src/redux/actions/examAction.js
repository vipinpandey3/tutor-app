import * as types from '../types';
import axios from 'axios';
import * as collection from '../../utils/collections'

export const fetchAllExams = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })

        const getData = async() => {
            const response = await axios.get('/faculty/get-exams', {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch tutor data!');
            }
            return response.data
        };

        try {
            const examData = await getData();
            if(examData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_EXAMS,
                    payload: {
                        error: false,
                        message: examData.resultLong,
                        loading: false,
                        examData: {
                            rows: examData.exams,
                            examTableHeader: examData.examTableHeader,
                            examNestedTableHeader: examData.examNestedTableHeader
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_EXAMS_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        mesaage: examData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_EXAMS_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    mesaage: error
                }
            })
        }
    }
};

export const fetchExamFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const getData = async() => {
            const response = await axios.get('/faculty/getExamFormFields', {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error("Could not fetch exam formfields");
            }
            return response.data;
        }

        try {
            const formData = await getData();
            if(formData.resultShort === 'success') {
                dispatch({
                    type: types.FECTH_EXAM_FORM_FIELDS,
                    payload: {
                        loading: false,
                        error: false,
                        message: formData.resultLong,
                        formFields: formData.formFields,
                        showForm: true,
                        formDetails: {
                            formName: "Create Exam",
                            buttonName: "Create",
                            editFlag: false
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FECTH_EXAM_FORM_FIELDS_ERROR,
                    payload: {
                        loading: false,
                        error: false,
                        mesage: formData.resultLong
                    } 
                })
            }
        } catch (error) {
            console.log("Error ==>>", error)
            dispatch({
                type: types.FECTH_EXAM_FORM_FIELDS_ERROR,
                payload: {
                    loading: false,
                    error: false,
                    mesage: error
                }
            })
        }
    }
}

export const fetchSubjectByStandard = (stdId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: true
        });

        const getSubjects = async() => {
            const response = await axios.get(`/faculty/getSubjects/${stdId}`, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error("Errrow while fetching Subjects");
            }
            return response.data
        };

        try {
            const subjects = await getSubjects();
            if(subjects.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_EXAM_SUBJECTS,
                    payload: {
                        loading: false,
                        error: false,
                        message: subjects.resultLong,
                        subjects: subjects.subjects
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_EXAM_SUBJECTS_ERROR,
                    payload: {
                        error: true,
                        loading: false,
                        mesaage: subjects.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_EXAM_SUBJECTS_ERROR,
                payload: {
                    error: true,
                    loading: false,
                    mesaage: error
                }
            })
        }
    }
}

export const createExam = (examObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: true
        })
        const addData = async() => {
            const response = await axios.post('/faculty/create-exam', examObj, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error("Could not fetch exam formfields");
            }
            return response.data;
        }

        try {
            const addedData = await addData();
            if(addedData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_EXAM,
                    payload: {
                        loading: false,
                        error: false,
                        message: addedData.resultLong,
                        showForm: false,
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        }
                    }
                });
                return fetchAllExams();
            } else {
                dispatch({
                    type: types.ADD_EXAM_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: addedData.resultLong,
                        show: true
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.ADD_FEES_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error,
                    showForm: true
                }
            })
        }
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

        const updateData = async() => {
            const response = await axios.post('/faculty/disableExam', postObj, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error("Could not delete exam");
            }
            return response.data;
        };

        try {
            const deletedData = await updateData();
            if(deletedData.resultShort === 'success') {
                dispatch({
                    type: types.DELETE_EXAM,
                    payload: {
                        loading: false,
                        error: false,
                        message: deletedData.resultLong
                    }
                })
                return fetchAllExams();
            } else {
                dispatch({
                    type: types.DELETE_EXAM_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: deletedData.resultLong
                    }
                })
            }
            return fetchAllExams();
        } catch (error) {
            dispatch({
                type: types.DELETE_EXAM_ERROR,
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
        dispatch({
            type: types.HIDE_NOTIFICATION
        })
    }
}