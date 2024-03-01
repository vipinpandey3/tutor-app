import * as types from '../types';

const initialState = {
    loading: false,
    error: false,
    message: "",
    standardsData: {
        data: [],
        attributes: []
    },
}

const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CLASSES:
            console.log("action.payload", action.payload);
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

        
    
        default:
            return state
    }
};

export default classReducer