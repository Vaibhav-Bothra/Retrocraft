import { getformbody } from "../helpers/utils";
import "react-toastify/dist/ReactToastify.css";
import {
  ACCEPT_JOB_FAILED,
  ACCEPT_JOB_START,
  ACCEPT_JOB_SUCCESS,
  ADD_JOB_FAILED,
  ADD_JOB_START,
  ADD_JOB_SUCCESS,
  FETCH_JOBS_FAILED,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESSFUL,
  JOBS_APPLY_FAILED,
  JOBS_APPLY_START,
  JOBS_APPLY_SUCCESS,
  REJECT_JOB_FAILED,
  REJECT_JOB_START,
  REJECT_JOB_SUCCESS,
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

export function jobsAddStart() {
  return {
    type: ADD_JOB_START,
  };
}

export function jobsAddSuccess() {
  return {
    type: ADD_JOB_SUCCESS,
  };
}

export function jobsAddFailed(errorMessage) {
  return {
    type: ADD_JOB_FAILED,
    error: errorMessage,
  };
}

export const addJob = (title, description, location, salary, req) => {
  return (dispatch) => {
    let url = "http://127.0.0.1:5000/api/jobs/add";
    dispatch(jobsAddStart());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: getformbody({
        title,
        description,
        location,
        salary,
        req,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(jobsAddSuccess());
          toast.success("Added job successfully!!");
        } else {
          dispatch(jobsAddFailed(data.error));
          toast.error(data.error);
        }
      });
  };
};

export function jobAcceptStart() {
  return {
    type: ACCEPT_JOB_START,
  };
}

export function jobAcceptFailed(errorMessage) {
  return {
    type: ACCEPT_JOB_FAILED,
    errorMessage,
  };
}

export function jobAcceptSuccess(successMessage) {
  return {
    type: ACCEPT_JOB_SUCCESS,
    successMessage,
  };
}

export function jobRejectStart() {
  return {
    type: REJECT_JOB_START,
  };
}

export function jobRejectFailed(errorMessage) {
  return {
    type: REJECT_JOB_FAILED,
    errorMessage,
  };
}

export function jobRejectSuccess(successMessage) {
  return {
    type: REJECT_JOB_SUCCESS,
    successMessage,
  };
}

export const accrejJob = (message, userId, jobId) => {
  return (dispatch) => {
    let url = "http://127.0.0.1:5000/api/jobs/request";
    let a = 1;
    if (message == "accepted") {
      a = 0;
    }
    if (a == 0) {
      dispatch(jobAcceptStart());
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: getformbody({
          message,
          jobId,
          userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.successMessage);
            dispatch(jobAcceptSuccess(data.successMessage));
          } else {
            toast.error("Some error occured!!");
            dispatch(jobAcceptFailed(data.errorMessage));
          }
        });
    } else {
      dispatch(jobRejectStart());
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: getformbody({
          message,
          jobId,
          userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.successMessage);
            dispatch(jobRejectSuccess(data.successMessage));
          } else {
            toast.error("Some error occured!!");
            dispatch(jobRejectFailed(data.errorMessage));
          }
        });
    }
  };
};
