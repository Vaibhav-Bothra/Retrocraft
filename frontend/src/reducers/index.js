import { combineReducers } from "redux";
import auth from "./auth";
import { jobState, userApplyState } from "./jobs";

export default combineReducers({
  auth,
  jobState,
  userApplyState,
});
