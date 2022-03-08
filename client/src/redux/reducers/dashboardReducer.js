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
    markeAttendenceTableData: {
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
            }
    
        default:
            return state;
    }
};

export default dashboardReducer