import { combineReducers } from "redux";
import auth from "./auth";
import jobState from "./jobs";

export default combineReducers({
  auth,
  jobState,
});
