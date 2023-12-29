import {
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESSFUL,
} from "../actions/actionTypes";

const initialJobsState = {
  jobs: [],
  error: null,
  inProgress: false,
};

export default function jobState(state = initialJobsState, action) {
  switch (action.type) {
    case FETCH_JOBS_START:
      return {
        ...state,
        inProgress: true,
      };
    case FETCH_JOBS_SUCCESSFUL:
      return {
        ...state,
        jobs: action.jobs,
        inProgress: false,
      };
    case FETCH_JOBS_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}
