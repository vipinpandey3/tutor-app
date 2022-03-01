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
    formFields: {
        parentFormFields: [],
        educationFormFields: [],
    },
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
    message: "",
    feesDetails: {
        feesTableHeaders: [],
        feesDetailsRow: []
    },
    totalPaid: 0
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

        case types.FETCH_PARENT_FORM:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formFields: {
                    parentFormFields: action.payload.parentFormFields,
                    educationFormFields: [],
                }
            };

        case types.FETCH_PARENT_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
            };

        case types.FETCH_STUDENTS_DETAILS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: false,
                studentDetails: {
                    details: action.payload.studentDetail,
                    educationDetails: action.payload.educationDetails,
                    parentDetails: action.payload.parentDetails,
                    studentDetailAttributes: action.payload.studentDetailAttributes,
                    parentDetailsAttributes: action.payload.parentDetailsAttributes,
                    educationDetailsAttributes: action.payload.educationDetailsAttributes
                },
            };

        case types.FETCH_STUDENTS_DETAILS_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
            };

        case types.ADD_PARENT_DATA:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                showForm: action.payload.showForm
            };
        
        case types.ADD_PARENT_DATA_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                showForm: action.payload.showForm
            };

        case types.FETCH_EDIT_PARENT_FORM:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formFields: {
                    parentFormFields: action.payload.parentFormFields,
                    educationFormFields: [],
                },
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.formName,
                    editFlag: action.payload.formDetails.editFlag
                }
            };

        case types.FETCH_EDIT_PARENT_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
            };
        
        case types.FETCH_EDUCATION_FORM:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formFields: {
                    educationFormFields: action.payload.formFields.educationFormFields,
                    parentFormFields: []
                },
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonTitle,
                    editFlag: action.payload.formDetails.editFlag
                }
            };
        
        case types.FETCH_EDUCATION_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm
            };

        case types.ADD_STUDENT_EDUCATION_DATA:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonTitle,
                    editFlag: action.payload.formDetails.editFlag
                }
            };

        case types.ADD_STUDENT_EDUCATION_DATA_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm
            };

    case types.FETCH_STUDENT_FEES_DATA:
        const totalPaid = action.payload.feesDetails.feesDetailsRow.reduce((accumulatedPaid, currentPaid) => {
            let total = accumulatedPaid + parseInt(currentPaid.paidAmount);
            return total;
          }, 0);
        return {
            ...state,
            loading: action.payload.loading,
            error: action.payload.error,
            message: action.payload.message,
            feesDetails: {
                feesTableHeaders: action.payload.feesDetails.feesTableHeaders,
                feesDetailsRow: action.payload.feesDetails.feesDetailsRow
            },
            totalPaid: totalPaid
        };

    case types.FETCH_STUDENT_FEES_DATA_ERROR:
        return {
            ...state,
            loading: action.payload.loading,
            error: action.payload.error,
            message: action.payload.message,
        }

    default:
        return state
    }
};

export default studentReducer