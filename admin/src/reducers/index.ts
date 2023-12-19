import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import toggleLoading from "./loading";

export default combineReducers({
    auth,
    message,
    toggleLoading
});
