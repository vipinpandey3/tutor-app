import { combineReducers } from "redux";

import tutorReducer from './tutorReducer';
import studentReducer from './studentReducer';
import feesReducer from "./feesReducer";
import examReducer from "./examReducer";
import dashboardReducer from './dashboardReducer';
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import classReducer from "./classReducer";

export default combineReducers({
	tutor: tutorReducer,
	student: studentReducer,
	fees: feesReducer,
	exam: examReducer,
	dashboard: dashboardReducer,
	user: userReducer,
	auth: authReducer,
	class: classReducer
});
