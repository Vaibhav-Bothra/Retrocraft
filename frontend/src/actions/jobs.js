import { getformbody } from "../helpers/utils";
import "react-toastify/dist/ReactToastify.css";
import {
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESSFUL,
  JOBS_APPLY_FAILED,
  JOBS_APPLY_START,
  JOBS_APPLY_SUCCESS,
} from "./actionTypes";
import { toast } from "react-toastify";

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

export function jobsApplyStart() {
  return {
    type: JOBS_APPLY_START,
  };
}

export function jobsApplySuccess(successMessage) {
  return {
    type: JOBS_APPLY_SUCCESS,
    success: successMessage,
  };
}

export function jobsApplyFailed(errorMessage) {
  return {
    type: JOBS_APPLY_FAILED,
    error: errorMessage,
  };
}

export const userApplyJobAction = (id) => async (dispatch) => {
  dispatch({ type: JOBS_APPLY_START });
  let url = `http://127.0.0.1:5000/api/jobs/apply/${id}`;
  fetch(url, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log("hi");
        toast.success("Applied for the job successfully!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
};
