import * as types from '../types';

const initialState = {
    loading: false,
    error: false,
    message: "",
    userTableData: {
        userRows: [],
        userAttributes: []
    },
    userFormFields: [],
    showForm: false,
    formDetails: {
        formName: "",
        buttonName: "",
        editFlag: false
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USERS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                userTableData: {
                    userRows: action.payload.userTableData.userRows,
                    userAttributes: action.payload.userTableData.userAttributes
                }
            };

        case types.FETCH_USERS_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };

        case types.FETCH_USER_FORM_FIELDS:
            return {
                ...state,
                userFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.formName,
                    buttonName: action.payload.buttonName,
                    editFlag: action.payload.editFlag
                },
                showForm: action.payload.showForm,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };
            
        case types.FETCH_USER_FORM_FIELDS_ERROR:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error,
                showForm: action.payload.showForm
            };

        case types.ADD_USER:
            return {
                ...state,
                userFormFields: action.payload.formFields,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    buttonName: action.payload.formDetails.buttonName,
                    editFlag: action.payload.formDetails.editFlag
                },
                showForm: action.payload.showForm,
                loading: action.payload.loading,
                message: action.payload.message,
                error: action.payload.error
            };

        case types.ADD_USER_ERROR:
            return {
                ...state,
                showForm: action.payload.showForm,
                loading: action.payload.loading,
                message: action.payload.message,
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

export default userReducer