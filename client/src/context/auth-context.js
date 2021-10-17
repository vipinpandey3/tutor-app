import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
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
                            if(result.data.resultShort === "success") {
                                setLocalStorage(result.data.authKey);
                                setIsAuth(true)
                                return result.data
                            }
                        })
        } catch(error) {
            console.log('Error response', error)
        }
    }

    return (
    <AuthContext.Provider
        value={{
            isAuth,
            setIsAuth,
            login,
            getLocalStorageItem
        }}
    >
        {props.children}
    </AuthContext.Provider>
    )
}