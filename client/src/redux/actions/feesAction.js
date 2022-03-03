import * as types from "../types";
import axios from 'axios';

export const fetchFeesFormFields = (postObj) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get('/admin/getFeesFormFields');
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees formfields!');
            }
            return response.data
        }

        try{
            const fieldData = await getData();
            if(fieldData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_FEES_FORM_FIELDS,
                    payload: {
                        showForm: true, 
                        formDetails: {
                            formName: postObj.formName,
                            buttonName: postObj.buttonName,
                            editFlag: postObj.editFlag
                        },
                        formFields: fieldData.formFields,
                        error: false,
                        loading: false,
                        message: fieldData.resultLong
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_FEES_FORM_FIELDS_ERROR,
                    payload: {
                        showForm: false, 
                        formFields: [],
                        error: true,
                        loading: false,
                        message: fieldData.resultLong
                    }
                })
            }
        } catch(error) {
            console.log("Error while fetching Fees fields", error);
            dispatch({
                type: types.FETCH_FEES_FORM_FIELDS_ERROR,
                payload: {
                    showForm: false,
                    formFields: [],
                    error: true,
                    loading: false,
                    message: error
                }
            })
        }
    }
}

export const fetchFeesDetails = () => {
    return async(dispatch) => {
        const getData = async() => {
            const response = await axios.get('/admin/getAllFees');
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees details!');
            };
            return response.data
        };

        try {
            const feesData = await getData();
            if(feesData.resultShort === 'success') {
                console.log("FeesData", feesData);
                dispatch({
                    type: types.FETCH_FEES,
                    payload: {
                        loading: false,
                        error: false,
                        message: feesData.resultLong,
                        feesDetails: {
                            attributes: feesData.feeAttributes,
                            feesData: feesData.feesDetails
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_FEES_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: feesData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error getting Fees Details", error);
            dispatch({
                type: types.FETCH_FEES_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}