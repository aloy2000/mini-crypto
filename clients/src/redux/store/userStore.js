import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'

import getCurrentUserInfoReducer from "../reducers/userReducer/profilReducer";
import postReducer from "../reducers/postReducer";
import messageReducer from "../reducers/messageReducer";

const rootReducer = combineReducers({
    getCurrentUserInfoReducer,
    postReducer,
    messageReducer
    
})

export const store = createStore(rootReducer, applyMiddleware(thunk))