import * as cookies from "sfcookies";
import axios from 'axios'

export const setCookies = (key, value) => cookies.bake_cookie(key, value);
export const getCookie = (key) => cookies.read_cookie(key).length < 1 ? "" : cookies.read_cookie(key);
export const deleteCookie = (key) => cookies.delete_cookie(key);

export const setHeader = (token) => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    if(token) {
        headers['Authorization'] = token;
    };
    return headers
}

export const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}