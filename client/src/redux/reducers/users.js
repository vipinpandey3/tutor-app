// import {GET_USERS_SUCCESS, GET_USER_FAILURE} from "../types"/


// const initialStaes = {
//     loading: false,
//     users: [],
//     userAttributes: [],
//     userForm: false,
//     message: null
// }


// // eslint-disable-next-line import/no-anonymous-default-export
// export default function(state=initialStaes, action) {
//     const {type, payload} = action
//     switch (action.type) {
//         case GET_USERS_SUCCESS:
//             console.log("Payload on success", payload)
//             return {
//                 ...state,
//                 loading: false,
//                 message: payload.data.message,
//                 users: action.payload.data.users,
//                 userAttributes: action.payload.data.attributes
//             }
//         case GET_USER_FAILURE: 
//             console.log('Payload on failure', payload)
//             return {
//                 ...state,
//                 loading: false,
//                 message: payload.data.message
//             } 
//         default:
//             return state;
//     }
// }