import * as types from "../types";
import axios from 'axios';
import * as collection from '../../utils/collections'

export const fetchFeesFormFields = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get('/admin/getFeesFormFields', {headers: collection.setHeader(token)});
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
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get('/admin/getAllFees', {headers: collection.setHeader(token)});
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
};

export const toggleForm = (flag) => {
    return async(dispatch, getState) => {
        
        dispatch({
            type: types.TOGGLE_FORM,
            payload: flag
        })
    }
}

export const addFeesDetails = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const addData = async() => {
            const response = await axios.post('/admin/add-feesDetails', postObj, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not add fees details!');
            };
            return response.data
        };

        try {
            const addedData = await addData();
            if(addedData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_FEES,
                    payload: {
                        loading: false,
                        error: false,
                        messgae: addedData.resultLong,
                        showForm: false,
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        }
                    }
                })
                fetchFeesDetails();
            } else {
                dispatch({
                    type: types.ADD_FEES_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        messgae: addedData.resultLong,
                        showForm: true
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.ADD_FEES_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    messgae: error,
                    showForm: true
                }
            })
        }
    }
}

export const toggleUploadSection = (flag) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_IMPORT,
            payload: flag
        })
    }
}

export const uploadFile = (postObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const uploadData = async() => {
            const response = await axios.post('/faculty/uploadFile', postObj, {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Error uploading fees data!');
            };
            return response.data
        }

        try {
            const uplaodedData = await uploadData();
            if(uplaodedData) {
                dispatch({
                    type: types.UPLOAD_FILE,
                    payload: {
                        error: false,
                        loading: false,
                        message: uplaodedData.resultLong,
                        showFileImport: false
                    }
                })
            } else {
                dispatch({
                    type: types.UPLOAD_FILE_ERROR,
                    payload: {
                        error: true,
                        loading: false,
                        message: uplaodedData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.UPLOAD_FILE_ERROR,
                payload: {
                    error: true,
                    loading: false,
                    message: error
                }
            })
        }
    }
}

export const searchFees = (searchParams) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get(`/faculty/searchFees/${searchParams}`, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Error while searching fees data!');
            };
            return response.data;
        }

        try {
            const searchData = await getData();
            if(searchData.resultShort === 'success') {
                dispatch({
                    type: types.SEACRH_FEES,
                    payload: {
                        loading: false,
                        error: false,
                        message: searchData.resultLong,
                        feesData: searchData.feesArray 
                    }
                })
            } else {
                dispatch({
                    type: types.SEACRH_FEES_ERROR,
                    payload: {
                        error: true,
                        loading: false,
                        message: searchData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("error while fees earch", error);
            dispatch({
                type: types.SEACRH_FEES_ERROR,
                payload: {
                    error: true,
                    loading: false,
                    message: error
                }
            })
        }
    }
};

export const downloadFeesbyId = (uuid) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        const getPDF = async() => {
            const response = await axios.get(`/faculty/downloadFeesReciept/${uuid}`,  {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': token
                },
                responseType: 'blob'
              });
            if(response.statusText !== "OK") {
                throw new Error('Error while searching fees data!');
            };
            console.log("response.data", response.data)
            return response.data;
        }

        try {
            const pdfData = await getPDF();
            if(pdfData) {
                dispatch({
                    type: types.DOWNLOAD_FEES,
                    payload: {
                        loading: false,
                        error: false,
                        result: pdfData,
                        uuid: uuid
                    }
                })
            } else {
                dispatch({
                    type: types.DOWNLOAD_FEES_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: "Error downloading fees PDF"
                    }
                })
            }
        } catch (error) {
            console.log("Error while downloading fees PDF", error)
            dispatch({
                type: types.DOWNLOAD_FEES_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}