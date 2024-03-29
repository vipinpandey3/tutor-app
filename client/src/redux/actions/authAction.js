import * as types from '../types';

import axios from 'axios';
import axiosHelper from '../../utils/AxiosHelper';
import dispatchEngine, { addPayload } from './actionHelper';

export const loginThree = (postObj) => {
    return async(dispatch, getState) => {
        // const {auth: {token}} = getState();
        const axiosData = await axiosHelper.sendRequest(types.LOGIN_URL, "POST", null, postObj)
        console.log('Axios data =========', axiosData)
        return dispatchEngine(axiosData, types.LOGIN_USER, dispatch, types.LOGIN_USER_ERROR)
    }
}

export const login = (postObj) => {
    return async(dispatch) => {
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const loginData = async() => {
            const response = await axios.post("/login", postObj);
            if(response.statusText !== 'OK') {
                throw new Error("Error while login!");
            }
            return response.data
        }

        try {
            const authdata = await loginData();
            if(authdata.resultShort === 'success') {
                localStorage.setItem('firstName', authdata.user.firstName);
                localStorage.setItem('lastName', authdata.user.lastName);
                localStorage.setItem('roleId', authdata.user.roleId);
                localStorage.setItem('roleName', authdata.user.roleName);
                localStorage.setItem('emailId', authdata.user.emailId);
                localStorage.setItem('userId', authdata.user.id)
                dispatch({
                    type: types.LOGIN_USER,
                    payload: {
                        isAuth: true,
                        token: authdata.user.token,
                        loading: false,
                        message: authdata.resultLong,
                        error: false
                    }
                })
            } else {
                dispatch({
                    type: types.LOGIN_USER_ERROR,
                    payload: {
                        loading: false,
                        message: authdata.resultLong,
                        error: true
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.LOGIN_USER_ERROR,
                payload: {
                    loading: false,
                    message: error,
                    error: true
                }
            })
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        localStorage.clear()
        dispatch({
            type: types.USER_LOGOUT
        })
    }
}

export const hideNotification = () => {
    return async(dispatch) => {
        dispatch({
            type: types.HIDE_NOTIFICATION
        })
    }
}

export const removeAuthToken = () => {
    return async(dispatch) => {
        console.log('Inside the removeAUthTOKEN');
        await dispatch({
            type: types.REMOVE_COOKIE,
            payload: {
                token: "",
                isAuth: false
            }
        });
    }
}