import * as types from "../types";

const initialState = {
    showForm: false,
    formDetails: {
        formName: "",
        buttonName: "",
        editFlag: false
    },
    feesDetails: {
        attributes: [],
        feesData: []
    },
    showFileImport: false,
    formFields: []
};

const feesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_FEES_FORM_FIELDS:
            return {
                ...state,
                showForm: action.payload.showForm,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                formDetails: {
                    formName: action.payload.formDetails.formName,
                    formButton: action.payload.formDetails.formButton,
                    editFlag: action.payload.formDetails.editFlag
                },
                formFields: action.payload.formFields
            };

        case types.FETCH_FEES_FORM_FIELDS_ERROR:
            return {
                ...state,
                showForm: action.payload.showForm,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                formFields: action.payload.formFields
            };

        case types.FETCH_FEES:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                message: action.payload.message,
                feesDetails: {
                    attributes: action.payload.feesDetails.attributes,
                    feesData: action.payload.feesDetails.feesData
                }
            };

        case types.FETCH_FEES_ERROR:
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

export default feesReducer