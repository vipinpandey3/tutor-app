import { combineReducers } from "redux";

import tutorReducer from './tutorReducer';
import studentReducer from './studentReducer'

export default combineReducers({
	tutor: tutorReducer,
	student: studentReducer
});