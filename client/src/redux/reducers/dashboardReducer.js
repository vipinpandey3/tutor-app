import * as types from '../types';

const intitalState = {
    showStudentTables: {
        searchUserInput: false,
        searchAttendeceInput: true,
        showStudentTable: false,
        showattendenceTable: true
    },
    studentAttendenceTableData: {
        attendenceRows: [],
        attendenceAttributes: []
    },
    markStudentAttendenceTableData: {
        rows: [],
        attributes: []
    },
    showTutorTables: {
        searchUserInput: false,
        searchAttendeceInput: true,
        showTutorTable: false,
        showattendenceTable: true
    },
    tutorAttendenceRecord: {
        attedenceRows: [],
        attendenceTableAttributes: []
    },
    markAttendenceTableData: {
        rows: [],
        attributes: []
    },
    loading: false,
    error: false,
    message: ""
};

const dashboardReducer = (state=intitalState, action) => {
    switch (action.type) {
        case types.FETCH_STUDENT_ATTENDENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                studentAttendenceTableData: {
                    attendenceRows: action.payload.studentAttendenceTableData.attendenceRows,
                    attendenceAttributes: action.payload.studentAttendenceTableData.attendenceAttributes
                },
                showStudentTables: {
                    searchUserInput: action.payload.showStudentTables.searchUserInput,
                    searchAttendeceInput: action.payload.showStudentTables.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTables.showStudentTable,
                    showattendenceTable: action.payload.showStudentTables.showattendenceTable
                }
            };

        case types.FETCH_STUDENT_ATTENDENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
            };

        case types.TOGGLE_STUDENT_ATTENDENCE_ELEMENT:
            return {
                ...state,
                showStudentTables: {
                    searchUserInput: action.payload.searchUserInput,
                    searchAttendeceInput: action.payload.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTable,
                    showattendenceTable: action.payload.showattendenceTable
                }
            };

        case types.SEARCH_STUDENT_ATTENDENCE_BY_ID:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                studentAttendenceTableData: {
                    attendenceRows: action.payload.studentAttendenceTableData.attendenceRows,
                    attendenceAttributes: action.payload.studentAttendenceTableData.attendenceAttributes
                },
                showStudentTables: {
                    searchUserInput: action.payload.showStudentTables.searchUserInput,
                    searchAttendeceInput: action.payload.showStudentTables.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTables.showStudentTable,
                    showattendenceTable: action.payload.showStudentTables.showattendenceTable
                }
            };

        case types.SEARCH_STUDENT_ATTENDENCE_BY_ID_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            }

        case types.SEARCH_STUDENT_BY_ID:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showStudentTables: {
                    searchUserInput: action.payload.showStudentTables.searchUserInput,
                    searchAttendeceInput: action.payload.showStudentTables.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTables.showStudentTable,
                    showattendenceTable: action.payload.showStudentTables.showattendenceTable
                },
                markStudentAttendenceTableData: {
                    rows: action.payload.markStudentAttendenceTableData.rows,
                    attributes: action.payload.markStudentAttendenceTableData.attributes
                }
            };

        case types.SEARCH_STUDENT_BY_ID_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            }

        case types.MARK_STUDENT_ATTENDENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showStudentTables: {
                    searchUserInput: action.payload.showStudentTables.searchUserInput,
                    searchAttendeceInput: action.payload.showStudentTables.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTables.showStudentTable,
                    showattendenceTable: action.payload.showStudentTables.showattendenceTable
                }
            };

        case types.MARK_STUDENT_ATTENDENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            }

        case types.MARK_STUDENT_ABSENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showStudentTables: {
                    searchUserInput: action.payload.showStudentTables.searchUserInput,
                    searchAttendeceInput: action.payload.showStudentTables.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTables.showStudentTable,
                    showattendenceTable: action.payload.showStudentTables.showattendenceTable
                }
            };

        case types.MARK_STUDENT_ABSENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            };

        case types.FETCH_TUTOR_ATTENDENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                tutorAttendenceRecord: {
                    attedenceRows: action.payload.tutorAttendenceRecord.attedenceRows,
                    attendenceTableAttributes: action.payload.tutorAttendenceRecord.attendenceTableAttributes,
                },
                showTutorTables: {
                    searchUserInput: action.payload.showTutorTables.searchUserInput,
                    searchAttendeceInput: action.payload.showTutorTables.searchAttendeceInput,
                    showTutorTable: action.payload.showTutorTables.showTutorTable,
                    showattendenceTable: action.payload.showTutorTables.showattendenceTable
                }
            };

        case types.FETCH_TUTOR_ATTENDENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
            };

        case types.TOGGLE_TUTOR_ATTENDENCE_ELEMENT:
            return {
                ...state,
                showTutorTables: {
                    searchUserInput: action.payload.searchUserInput,
                    searchAttendeceInput: action.payload.searchAttendeceInput,
                    showTutorTable: action.payload.showTutorTable,
                    showattendenceTable: action.payload.showattendenceTable
                }
            };

        case types.SEARCH_TUTOR_BY_ID:
            return {
                ...state,
                showTutorTables: {
                    searchUserInput: action.payload.showTutorTables.searchUserInput,
                    searchAttendeceInput: action.payload.showTutorTables.searchAttendeceInput,
                    showTutorTable: action.payload.showTutorTables.showTutorTable,
                    showattendenceTable: action.payload.showTutorTables.showattendenceTable
                },
                markAttendenceTableData: {
                    rows: action.payload.markAttendenceTableData.rows,
                    attributes: action.payload.markAttendenceTableData.attributes
                }
            };

        case types.SEARCH_TUTOR_BY_ID_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
            };
        
        case types.MARK_TUTOR_ATTENDENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showTutorTables: {
                    searchUserInput: action.payload.showTutorTables.searchUserInput,
                    searchAttendeceInput: action.payload.showTutorTables.searchAttendeceInput,
                    showStudentTable: action.payload.showTutorTables.showStudentTable,
                    showattendenceTable: action.payload.showTutorTables.showattendenceTable
                }
            };

        case types.MARK_TUTOR_ATTENDENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            }

        case types.UPDATE_TUTOR_ATTENDENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showTutorTables: {
                    searchUserInput: action.payload.showTutorTables.searchUserInput,
                    searchAttendeceInput: action.payload.showTutorTables.searchAttendeceInput,
                    showStudentTable: action.payload.showTutorTables.showStudentTable,
                    showattendenceTable: action.payload.showTutorTables.showattendenceTable
                }
            };

        case types.UPDATE_TUTOR_ATTENDENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            };

        case types.MARK_TUTOR_ABSENCE:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                showTutorTables: {
                    searchUserInput: action.payload.showStudentTables.searchUserInput,
                    searchAttendeceInput: action.payload.showStudentTables.searchAttendeceInput,
                    showStudentTable: action.payload.showStudentTables.showStudentTable,
                    showattendenceTable: action.payload.showStudentTables.showattendenceTable
                }
            };

        case types.MARK_TUTOR_ABSENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            };
    
        default:
            return state;
    }
};

export default dashboardReducer