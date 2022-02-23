import * as types from "../types";

const intitialState = {
    students: {
        studentTablerows: [],
        studentTableAttributes: []
    },
    studentFormFields: [],
    showForm: true,
    formDetails: {
        formName: "",
        buttonName: "",
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
            }

        case types.FETCH_STUDENTS:
            console.log('Action.paylad', action.payload)
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
            }

        default:
            return state
    }
};

export default studentReducer