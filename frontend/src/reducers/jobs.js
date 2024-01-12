import {
  ADD_JOB_FAILED,
  ADD_JOB_START,
  ADD_JOB_SUCCESS,
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESSFUL,
  JOBS_APPLY_FAILED,
  JOBS_APPLY_START,
  JOBS_APPLY_SUCCESS,
} from "../actions/actionTypes";

const initialJobsState = {
  jobs: [],
  error: null,
  inProgress: false,
};

export function jobState(state = initialJobsState, action) {
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

const initialUserApplyState = {
  error: null,
  inProgress: false,
  success: false,
};

export function userApplyState(state = initialUserApplyState, action) {
  switch (action.type) {
    case JOBS_APPLY_START:
      return {
        ...state,
        inProgress: true,
      };
    case JOBS_APPLY_FAILED:
      return {
        ...state,
        error: action.error,
        success: false,
      };
    case JOBS_APPLY_SUCCESS:
      return {
        ...state,
        inProgress: false,
        success: true,
      };
    default:
      return state;
  }
}

const initialAddJobState = {
  error: null,
  inProgress: false,
  success: false,
};

export function addJobState(state = initialUserApplyState, action) {
  switch (action.type) {
    case ADD_JOB_START:
      return {
        ...state,
        inProgress: true,
      };
    case ADD_JOB_FAILED:
      return {
        ...state,
        error: action.error,
        success: false,
      };
    case ADD_JOB_SUCCESS:
      return {
        ...state,
        inProgress: false,
        success: true,
      };
    default:
      return state;
  }
}
