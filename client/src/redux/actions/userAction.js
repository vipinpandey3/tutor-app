// import {GET_USERS_SUCCESS, GET_USER_FAILURE} from "../types"
// import {header} from '../header'

// export const fetchUser = () => async (dispatch) => {
    //     try {
        //         return await axios.get("/admin/get-users", header)
        //                         .then((response) => {
            //                             if(response.data.resultShort === "success") {
                //                                 dispatch({
                    //                                     type: GET_USERS_SUCCESS,
                    //                                     payload: response.data 
                    //                                 })
                    //                             } else {
                        //                                 dispatch({
                            //                                     type: GET_USER_FAILURE,
//                                     payload: {message: "Error while fetching Users"}
//                                 })
//                             }
//                         })
//     } catch(error) {
    //         dispatch({
//             type: GET_USER_FAILURE,
//             payload: {message: "Error while fetching Users"}
//         })
//     }
// }

import axios from 'axios';
import * as types from '../types'

export const getUsers = () => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const getData = async() => {
            const response = await axios.get("/admin/get-users");
            if(response.statusText !== 'OK') {
                throw new Error("Error while fetching User");
            }
            return response.data;
        }

        try {
            const users = await getData();
            if(users.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_USERS,
                    payload: {
                        loading: false,
                        error: false,
                        message: users.resultLong,
                        userTableData: {
                            userRows: users.userData,
                            userAttributes: users.attributes
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_USERS_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: users.resultLong
                    }
                })    
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_USERS_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}

export const getUserForm = () => {
    return async (dispatch) => {
        const getData = async() => {
            const response = await axios.get('/admin/get-user-formFields');
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch user data!');
            }
            return response.data
        }

        try {
            const userFormData = await getData();
            if(userFormData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_USER_FORM_FIELDS,
                    payload: {
                        formFields: userFormData.formFields,
                        formName: "Add User",
                        editFlag: false,
                        buttonName: 'Submit',
                        showForm: true,
                        loading: false,
                        error: false,
                        message: userFormData.resultLong
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_USER_FORM_FIELDS_ERROR,
                    payload: {
                        formFields: [],
                        formName: "Add User",
                        editFlag: false,
                        buttonName: 'Submit',
                        showForm: false,
                        loading: false,
                        error: false,
                        message: userFormData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_USER_FORM_FIELDS_ERROR,
                payload: {
                    showForm: false,
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}

export const createUser = (userValues) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });

        const addData = async(postObj) => {
            const response = await axios.post('/admin/add-User', postObj);
            if(response.statusText !== 'OK') {
                throw new Error('Error while adding user');
            };
            return response.data
        }

        try {
            const addedData = await addData(userValues);
            if(addedData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_USER,
                    payload: {
                        loading: false,
                        error: false,
                        message: addedData.resultLong,
                        showForm: false,
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        },
                        formFields: []
                    }
                });
                return getUsers()
            } else {
                dispatch({
                    type: types.ADD_USER_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: addedData.resultLong
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.ADD_USER_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: error
                }
            })
        }
    }
}