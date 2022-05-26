/* eslint-disable no-unused-vars */
import React, {createContext, useEffect, useReducer, useState} from 'react';
import axios from 'axios'
import {GET_LOGIN_SUCCESS, GET_LOGIN_FAILURE, GET_LOGOUT_HANDLER} from './types'

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type) {
        case GET_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.authKey)
            return {
                ...state,
                isAuth: true,
                error: false,
                token: action.payload.authKey
            };
        case GET_LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                error: true,
                token: null
            };

        case GET_LOGOUT_HANDLER:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth: false,
                error: false,
                token: null
            }

        default: 
            return state
    }
}

export const AuthContextProvider = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuth: false,
        error: false
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const [isAuth, setIsAuth] = useState(false);

    const setLocalStorage = (value) => {
        return localStorage.setItem('token', value) 
    }
    
    const removeLocalStorageItem = () => {
        return localStorage.removeItem('token')
    }
    
    const getLocalStorageItem = () => {
        return localStorage.getItem('token')
    }

    useEffect(() => {
        const token = getLocalStorageItem();
        if(token === null || token === 'undefined') {
            return setIsAuth(false);
        } else {
            return setIsAuth(true)
        }
    }, [])

    const login = async(userObj) => {
        try {
            return await axios.post('/login', userObj)
                        .then(result => {
                            dispatch({
                                type: GET_LOGIN_SUCCESS,
                                payload: result.data
                            })
                        })
        } catch(error) {
            dispatch({
                type: GET_LOGIN_FAILURE
            })
            console.log('Error response', error)
        }
    }

    const logout = () => {
        dispatch({
            type: GET_LOGOUT_HANDLER
        })
    }

    return (
    <AuthContext.Provider
        value={{
            isAuth: state.isAuth,
            token: state.token,
            setIsAuth,
            login,
            getLocalStorageItem,
            logout
        }}
    >
        {props.children}
    </AuthContext.Provider>
    )
}