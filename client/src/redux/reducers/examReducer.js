import * as types from '../types';

const initialState = {
    formDetails: {
        formName: "",
        buttonName: "",
        editFlag: false
    },
    subjects: [],
    showForm: false,
    examFormFields: [],
    examData: {
        rows: [],
        examTableHeader: [],
        examNestedTableHeader: []
    },
    loading: false,
    message: "",
    error: false
}

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_EXAMS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                examData: {
                    rows: action.payload.data.exams,
                    examTableHeader: action.payload.data.examTableHeader,
                    examNestedTableHeader: action.payload.data.examNestedTableHeader
                }
            };

        case types.FETCH_EXAMS_ERROR: 
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };

        case types.FECTH_EXAM_FORM_FIELDS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                examFormFields: action.payload.data,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonName: action.payload.formDetails.buttonName,
                    editFlag: action.payload.formDetails.editFlag
                },
                showForm: action.payload.showForm
            };

        case types.FECTH_EXAM_FORM_FIELDS_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
            };
            

        case types.FETCH_EXAM_SUBJECTS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                subjects: action.payload.data
            }

        case types.FETCH_EXAM_SUBJECTS_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
            }
            
        case types.ADD_EXAM:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonName: action.payload.formDetails.buttonName,
                    editFlag: action.payload.formDetails.editFlag
                },
                showForm: action.payload.data.showForm
            };


        case types.TOGGLE_FORM:
            return {
                ...state,
                showForm: action.payload.showForm,
                formDetails: {
                    formName: action.payload.formName,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
            }

        case types.HIDE_NOTIFICATION:
            return {
                ...state,
                error: false,
                message: ""
            }

        default:
            return state;
    }
}

export default examReducer