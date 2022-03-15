// import {GET_USERS_SUCCESS, GET_USER_FAILURE} from "../types"
// import axios from 'axios';
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