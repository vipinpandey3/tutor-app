import { createStore, applyMiddleware } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise";

// import tutorReducer from "./tutorSlice";
import reducer from './reducers/index'

const persistConfig = {
    key: 'root',
    storage,
};

let middleware = [thunk, promise, logger];

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(...middleware))
export const persistor = persistStore(store);

// export default store
