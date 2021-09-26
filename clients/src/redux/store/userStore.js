import { createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk'

import getCurrentUserInfoReducer from "../reducers/userReducer/profilReducer";

const rootReducer = combineReducers({
    getCurrentUserInfoReducer,  
})

export const store = createStore(rootReducer, applyMiddleware(thunk))