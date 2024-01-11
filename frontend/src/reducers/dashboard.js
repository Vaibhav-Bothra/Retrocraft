import {
  ADD_EXPERIENCE_FAILED,
  ADD_EXPERIENCE_START,
  ADD_EXPERIENCE_SUCCESS,
} from "../actions/actionTypes";

const initialDashboardState = {
  error: null,
  inProgress: false,
};

export default function auth(state = initialDashboardState, action) {
  switch (action.type) {
    case ADD_EXPERIENCE_START:
      return {
        ...state,
        inProgress: true,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        inProgress: false,
      };
    case ADD_EXPERIENCE_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return state;
  }
}
