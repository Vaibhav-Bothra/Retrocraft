import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from "./dashboard";
import { jobState, userApplyState, addJobState } from "./jobs";

export default combineReducers({
  auth,
  jobState,
  userApplyState,
  dashboard,
  addJobState,
});
