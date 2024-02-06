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
    totalPaid: 0,
    showFileImport: false,
    studentAttendenceTable: {
        attendenceTableRows: [],
        attendenceTableColumns: []
    },
    studentAttendenceData: {
        attendence: 0,
        absence: 0
    },
    severity: ""
};

const studentReducer = (state = intitialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case types.TOGGLE_IMPORT:
            return {
                ...state,
                showFileImport: action.payload
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
                    studentTablerows: action.payload.students,
                    studentTableAttributes: action.payload.attributes
                },
                loading: action.payload.loading,
                message: action.payload.message,
                severity: action.payload.severity
            }
    
        case types.FETCH_STUDENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message,
                severity: action.payload.severity
            };

        case types.FETCH_STUDENT_FORM:
            return {
                ...state,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonName,
                    editFlag: false
                },
                studentFormFields: action.payload.formFields,
                loading: action.payload.loading,
                message: action.payload.message,
                showForm: action.payload.showForm,
                severity: action.payload.severity,
                error: action.payload.error
            };

        case types.FETCH_STUDENT_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                severity: action.payload.severity
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
                showForm: action.payload.showForm,
                severity: action.payload.severity
            };

        case types.ADD_STUDENT_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                severity: action.payload.severity
            };

        case types.FETCH_PARENT_FORM:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formFields: {
                    parentFormFields: action.payload.formFields,
                    educationFormFields: [],
                },
                severity: action.payload.severity
            };

        case types.UPLOAD_FILE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showFileImport: action.payload.showFileImport,
                severity: action.payload.severity
            };

        case types.UPLOAD_FILE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                severity: action.payload.severity
            };

        case types.FETCH_PARENT_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                severity: action.payload.severity
            };

        case types.FETCH_STUDENTS_DETAILS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                studentDetails: {
                    details: action.payload.studentDetails,
                    educationDetails: action.payload.studentDetails.StudentEducationDetails,
                    parentDetails: action.payload.studentDetails.Parent,
                    studentDetailAttributes: action.payload.studentDetailAttributes,
                    parentDetailsAttributes: action.payload.parentDetailsAttributes,
                    educationDetailsAttributes: action.payload.educationDetailsAttributes
                },
                severity: action.payload.severity
            };

        case types.FETCH_STUDENTS_DETAILS_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                severity: action.payload.severity
            };

        case types.ADD_PARENT_DATA:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                showForm: action.payload.showForm,
                severity: action.payload.severity
            };
        
        case types.ADD_PARENT_DATA_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                showForm: action.payload.showForm,
                severity: action.payload.severity
            };

        case types.FETCH_EDIT_PARENT_FORM:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formFields: {
                    parentFormFields: action.payload.formFields,
                    educationFormFields: [],
                },
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonTitle,
                    editFlag: action.payload.formDetails.editFlag
                },
                severity: action.payload.severity
            };

        case types.FETCH_EDIT_PARENT_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                severity: action.payload.severity
            };
        
        case types.FETCH_EDUCATION_FORM:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
                formFields: {
                    educationFormFields: action.payload.formFields,
                    parentFormFields: []
                },
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonTitle: action.payload.formDetails.buttonTitle,
                    editFlag: action.payload.formDetails.editFlag
                },
            };
        
        case types.FETCH_EDUCATION_FORM_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showForm: action.payload.showForm,
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
        const totalPaid = action.payload.fees.reduce((accumulatedPaid, currentPaid) => {
            let total = accumulatedPaid + parseInt(currentPaid.paidAmount);
            return total;
        }, 0);
        return {
            ...state,
            loading: action.payload.loading,
            error: action.payload.error,
            message: action.payload.message,
            feesDetails: {
                feesTableHeaders: action.payload.header,
                feesDetailsRow: action.payload.fees
            },
            totalPaid: totalPaid
        };

    case types.FETCH_STUDENT_FEES_DATA_ERROR:
        return {
            ...state,
            loading: action.payload.loading,
            error: action.payload.error,
            message: action.payload.message,
        };

    case types.UPDATE_STUDENT_EDUCATION_DETAILS:
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

    case types.UPDATE_STUDENT_EDUCATION_DETAILS_ERROR:
        return {
            ...state,
            loading: action.payload.loading,
            error: action.payload.error,
            message: action.payload.message,
            showForm: action.payload.showForm,
        }

    case types.GET_STUDENT_ATTENDENCE:
        return {
            ...state,
            studentAttendenceTable: {
                attendenceTableRows: action.payload.data.rows,
                attendenceTableColumns: action.payload.data.attributes
            },
            studentAttendenceData: {
                attendence: action.payload.data.attendenceData.currentStudentAttendence,
                absence: action.payload.data.attendenceData.totalAbsence
            },
            loading: action.payload.loading,
            message: action.payload.message
        };

    case types.GET_STUDENT_ATTENDENCE_ERROR:
        return {
            ...state,
            loading: action.payload.loading,
            message: action.payload.message,
            error: action.payload.error
        }
        
    case types.HIDE_NOTIFICATION:
        return {
            ...state,
            error: false,
            message: ""
        }

    default:
        return state
    }
};

export default studentReducer