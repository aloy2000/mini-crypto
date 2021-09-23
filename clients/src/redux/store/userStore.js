import { createStore } from "redux";
import getCurrentUserInfo from "../reducers/userReducer/profilReducer";

export default createStore(getCurrentUserInfo)