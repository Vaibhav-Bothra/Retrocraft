import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from "./dashboard";
import { jobState, userApplyState } from "./jobs";

export default combineReducers({
  auth,
  jobState,
  userApplyState,
  dashboard,
});
