import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise";

// import tutorReducer from "./tutorSlice";
import reducer from './reducers/index'

let middleware = [thunk, promise, logger];

const store = createStore(reducer, applyMiddleware(...middleware))

export default store
