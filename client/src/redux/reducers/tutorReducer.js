import * as types from '../types'

const initialState = {
    tutors: {
        tutorRows: [],
        tutorTableAttributes: []
    },
    formDetails: {
        formName: "Add Tutor",
        buttonName: "Submit",
        editFlag: false
    },
    showForm: false,
    tutorFormFields: [],
    tutorDetails: {
        tutorData: {},
        tutorDetailsAttributes: [],
        educationDetails: [],
        educationAttrbutes: []
    },
    educationFormFields: []
}

const tutorReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.FETCH_TUTORS:
            console.log('action', action.payload)
            return {
                ...state,
                tutors: {
                    tutorRows: action.payload.data,
                    tutorTableAttributes: action.payload.tutorTableAttributes
                }
            };

        case types.FETCH_TUTORS_ERROR: 
            return {
                ...state,
                tutors: {
                    tutorRows: action.payload.data,
                    tutorTableAttributes: action.payload.tutorTableAttributes
                }
            };

        case types.FETCH_TUTOR_FORM: 
            return {
                ...state,
                tutorFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.formName,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            }

        case types.FETCH_TUTOR_FORM_ERROR:
                return {
                    ...state,
                    tutorFormFields: [],
                    formDetails: {
                        formName: action.payload.formName,
                        buttonName: action.payload.buttonName,
                        editFlag: action.payload.editFlag
                    },
                    showForm: action.payload.showForm
                };

        case types.TOGGLE_FORM:
            console.log("Action.payload", action.payload)
            return {
                ...state,
                showForm: action.payload.showForm,
                formDetails: {
                    formName: action.payload.formName,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                }
            };

        case types.FETCH_TUTOR_DETAIL: 
            return {
                ...state,
                tutorDetails: {
                    tutorData: action.payload.tutorData,
                    tutorDetailsAttributes: action.payload.tutorDetailsAttributes,
                    educationDetails: action.payload.educationDetails,
                    educationAttrbutes: action.payload.educationAttributes
                }
            };

        case types.FETCH_TUTOR_EDUCATION_FORMFIELD: 
            return {
                ...state,
                educationFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.title,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            };

        case types.FETCH_TUTOR_EDUCATION_FORMFIELD_ERROR:
            return {
                ...state,
                educationFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.title,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            };

        case types.ADD_TEACHER_EDUCATION_DETAILS:
            return {
                ...state,
                educationFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.title,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            };

        case types.ADD_TEACHER_EDUCATION_DETAILS_ERROR:
            return {
                ...state,
                formDetails: {
                    formName: action.payload.title,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            };

        case types.UPDATE_TEACHER_EDUCATION_DETAILS:
            return {
                ...state,
                formDetails: {
                    formName: action.payload.title,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            }

        case types.UPDATE_TEACHER_EDUCATION_DETAILS_ERROR:
            return {
                ...state,
                formDetails: {
                    formName: action.payload.title,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm
            };

        default: return state;
    }
}

export default tutorReducer