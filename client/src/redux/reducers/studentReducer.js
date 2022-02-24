import * as types from "../types";

const intitialState = {
    students: {
        studentTablerows: [],
        studentTableAttributes: []
    },
    studentFormFields: [],
    showForm: false,
    formDetails: {
        formName: "",
        buttonTitle: "",
        editFlag: false
    },
    parentFormFields: [],
    educationFormFields: [],
    studentDetails: {
        details: {},
        educationDetails: [],
        parentDetails: {},
        studentDetailAttributes: [],
        parentDetailsAttributes: [],
        educationDetailsAttributes: []
    },
    loading: false,
    error: false,
    message: ""
};

const studentReducer = (state = intitialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case types.TOGGLE_FORM:
            return {
                ...state,
                showForm: action.payload
            }

        case types.FETCH_STUDENTS:
            return {
                ...state,
                students: {
                    studentTablerows: action.payload.data,
                    studentTableAttributes: action.payload.attributes
                },
                loading: action.payload.loading,
                message: action.payload.message
            }
    
        case types.FETCH_STUDENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            };

        case types.FETCH_STUDENT_FORM:
            return {
                ...state,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonName,
                    editFlag: false
                },
                studentFormFields: action.payload.studentFormFields,
                loading: action.payload.loading,
                message: action.payload.message,
                showForm: action.payload.showForm
            };

        case types.FETCH_STUDENT_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };

        case types.ADD_STUDENT:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonName,
                    editFlag: action.payload.formDetails.editFlag
                },
                showForm: action.payload.showForm
            };

        case types.ADD_STUDENT_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm
            };

        default:
            return state
    }
};

export default studentReducer