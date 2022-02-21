import { combineReducers } from "redux";

import tutorReducer from './tutorReducer';

export default combineReducers({
	tutor: tutorReducer,
});