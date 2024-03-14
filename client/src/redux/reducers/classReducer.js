import * as types from '../types';

const initialState = {
    loading: false,
    error: false,
    message: "",
    standardsData: {
        data: [],
        attributes: []
    },
    teacher_id: null,
    subject_id: null,
    is_class_teacher: false,
    subjetc_name: null
}

const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CLASSES:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                standardsData: {
                    data: action.payload.data.class,
                    attributes: action.payload.data.attributes
                }
            };

        case types.FETCH_CLASSES_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };

        case types.TEACHER_DETAILS:
            console.log("*******", action.payload.is_class_teacher)
            return {
                ...state,
                teacher_id: action.payload.UserMap.id,
                subject_id: action.payload.subject_id,
                is_class_teacher: action.payload.is_class_teacher,
                subjetc_name: action.payload.subject_name
            }

        case types.ADD_REMARKS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };
    
        default:
            return state
    }
};

export default classReducer