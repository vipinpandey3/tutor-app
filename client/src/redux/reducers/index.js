import { combineReducers } from "redux";

import tutorReducer from './tutorReducer';
import studentReducer from './studentReducer';
import feesReducer from "./feesReducer";

export default combineReducers({
	tutor: tutorReducer,
	student: studentReducer,
	fees: feesReducer
});