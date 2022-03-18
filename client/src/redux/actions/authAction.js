import * as types from '../types';
import * as collection from '../../utils/collections'
import axios from 'axios';

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
                dispatch({
                    type: types.LOGIN_USER,
                    payload: {
                        isAuth: true,
                        token: authdata.authKey,
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