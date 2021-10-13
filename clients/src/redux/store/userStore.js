import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'

import getCurrentUserInfoReducer from "../reducers/userReducer/profilReducer";
import postReducer from "../reducers/postReducer";

const rootReducer = combineReducers({
    getCurrentUserInfoReducer,
    postReducer,
    
})

export const store = createStore(rootReducer, applyMiddleware(thunk))