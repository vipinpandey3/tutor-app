import { combineReducers } from "redux";

import tutorReducer from './tutorReducer';
import studentReducer from './studentReducer';
import feesReducer from "./feesReducer";
import examReducer from "./examReducer";
import dashboardReducer from './dashboardReducer';

export default combineReducers({
	tutor: tutorReducer,
	student: studentReducer,
	fees: feesReducer,
	exam: examReducer,
	dashboard: dashboardReducer
});
