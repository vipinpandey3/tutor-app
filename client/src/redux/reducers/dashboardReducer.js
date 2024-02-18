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
    chartData: [],
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
                    attendenceRows: action.payload.data.attendence,
                    attendenceAttributes: action.payload.data.attributes
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
                    attendenceRows: action.payload.attendence,
                    attendenceAttributes: action.payload.attributes
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
                    rows: action.payload.data.studentDetails,
                    attributes: action.payload.data.attributes
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
                    attedenceRows: action.payload.attendence,
                    attendenceTableAttributes: action.payload.attributes,
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
                    rows: action.payload.tutorDetails,
                    attributes: action.payload.attributes
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
                    searchUserInput: action.payload.showTutorTables.searchUserInput,
                    searchAttendeceInput: action.payload.showTutorTables.searchAttendeceInput,
                    showStudentTable: action.payload.showTutorTables.showStudentTable,
                    showattendenceTable: action.payload.showTutorTables.showattendenceTable
                }
            };

        case types.MARK_TUTOR_ABSENCE_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
            };

        case types.GET_STUDENT_ATTENDENCE_CHART_DATA:
            return {
                ...state,
                chartData: action.payload.result
            }

        case types.SEARCH_TUTOR_ATTENDENCE_BY_ID:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                tutorAttendenceRecord: {
                    attedenceRows: action.payload.attendence,
                    attendenceTableAttributes: action.payload.attributes
                },
                showTutorTables: {
                    searchUserInput: action.payload.showTutorTables.searchUserInput,
                    searchAttendeceInput: action.payload.showTutorTables.searchAttendeceInput,
                    showStudentTable: action.payload.showTutorTables.showStudentTable,
                    showattendenceTable: action.payload.showTutorTables.showattendenceTable
                }
            };

        case types.SEARCH_TUTOR_ATTENDENCE_BY_ID_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message
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
};

export default dashboardReducer