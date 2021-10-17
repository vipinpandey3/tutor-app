import { combineReducers } from 'redux';
import users from './users';
import tutors from './tutors';

export default combineReducers({
    users,
    tutors
})