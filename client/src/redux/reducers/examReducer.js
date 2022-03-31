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
                    rows: action.payload.examData.rows,
                    examTableHeader: action.payload.examData.examTableHeader,
                    examNestedTableHeader: action.payload.examData.examNestedTableHeader
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
                examFormFields: action.payload.formFields,
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
                subjects: action.payload.subjects
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
                showForm: action.payload.showForm
            };


        case types.TOGGLE_FORM:
            return {
                ...state,
                showForm: action.payload.showForm,
                formDetails: {
                    formName: action.payload.formName,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                }
            }
        default:
            return state;
    }
}

export default examReducer