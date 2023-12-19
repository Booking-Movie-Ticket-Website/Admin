import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import loading from "./loading";

export default combineReducers({
    auth,
    message,
    loading
});
