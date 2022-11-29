import * as types from '../types'

const initialState = {
    tutors: {
        tutorRows: [],
        tutorTableAttributes: []
    },
    formDetails: {
        formName: "Add Tutor",
        buttonTitle: "Submit",
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
            return {
                ...state,
                tutors: {
                    tutorRows: action.payload.data,
                    tutorTableAttributes: action.payload.tutorTableAtttibutes
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

        case types.ADD_TUTOR:
            return {
                ...state,
                showForm: action.payload.showForm,
                formDetails: {
                    formName: action.payload.formDetailsformName,
                    buttonName: action.payload.formDetails.buttonName,
                    editFlag: action.payload.formDetails.editFlag
                },
                tutorFormFields: action.payload.formFields
            };

        case types.ADD_TUTOR_ERROR:
            return {
                ...state,
                showForm: action.payload.showForm,
                formDetails: {
                    formName: action.payload.formDetailsformName,
                    buttonName: action.payload.formDetails.buttonName,
                    editFlag: action.payload.formDetails.editFlag
                }
            }

        case types.FETCH_TUTOR_DETAIL: 
            return {
                ...state,
                tutorDetails: {
                    tutorData: action.payload.data,
                    tutorDetailsAttributes: action.payload.attributes,
                    educationDetails: action.payload.data.TutorEducationDetails,
                    educationAttrbutes: action.payload.educationAttributes
                }
            };

        case types.FETCH_TUTOR_EDUCATION_FORMFIELD: 
            return {
                ...state,
                educationFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.title,
                    buttonTitle: action.payload.buttonName,
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

        case types.HIDE_NOTIFICATION:
            return {
                ...state,
                error: false,
                message: ""
            }

        default: return state;
    }
}

export default tutorReducer