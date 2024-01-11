import { getformbody } from "../helpers/utils";
import { toast } from "react-toastify";
import {
  ADD_EXPERIENCE_FAILED,
  ADD_EXPERIENCE_START,
  ADD_EXPERIENCE_SUCCESS,
} from "./actionTypes";

export function startAddExp() {
  return {
    type: ADD_EXPERIENCE_START,
  };
}

export function addExpSuccess() {
  return {
    type: ADD_EXPERIENCE_SUCCESS,
  };
}

export function addExpFailed(errorMessage) {
  return {
    type: ADD_EXPERIENCE_FAILED,
    error: errorMessage,
  };
}

export function addExp(title, company, duration, description) {
  return (dispatch) => {
    let url = "http://127.0.0.1:5000/api/users/dashboard/addExp";
    dispatch(startAddExp());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: getformbody({
        title,
        company,
        duration,
        description,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(addExpSuccess());
          toast.success("Added experience successfully!!");
        } else {
          dispatch(addExpFailed(data.error));
          toast.error(data.error);
        }
      });
  };
}

export function addSkill(skill) {
  return (dispatch) => {
    let url = "http://127.0.0.1:5000/api/users/dashboard/addSkill";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: getformbody({
        skill,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Added skill successfully!!");
        } else {
          toast.error(data.error);
        }
      });
  };
}
