import {
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESSFUL,
} from "./actionTypes";

export function fetchJobsStart() {
  return {
    type: FETCH_JOBS_START,
  };
}

export function fetchJobsSuccess(jobs) {
  return {
    type: FETCH_JOBS_SUCCESSFUL,
    jobs: jobs,
  };
}

export function fetchJobsFailed(error) {
  return {
    type: FETCH_JOBS_FAILED,
    error: error,
  };
}
