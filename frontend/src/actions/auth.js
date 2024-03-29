import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "../actions/actionTypes";
import { getformbody } from "../helpers/utils";
import { toast } from "react-toastify";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function signIn(email, password) {
  return (dispatch) => {
    let url = "http://127.0.0.1:5000/api/users/signin";
    dispatch(startLogin());
    let status;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: getformbody({ email, password }),
    })
      .then((response) => {
        status = response.status;
        if (status === 500) {
          dispatch(loginFailed("Invalid Email/Password..."));
          toast.error("Invalid Email/Password!!");
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.success) {
          localStorage.setItem("token", data.token);
          dispatch(loginSuccess(data.user));
          toast.success("Logged in successfully!!");
        }
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

export function signUp(
  name,
  email,
  password,
  file,
  gender,
  profession,
  number,
  description
) {
  return (dispatch) => {
    let url = "http://127.0.0.1:5000/api/users/signup";
    dispatch(startSignup());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: getformbody({
        name,
        email,
        password,
        file,
        gender,
        profession,
        number,
        description,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(signupSuccess(data.user));
          toast.success("Signed up successfully!!");
        } else {
          dispatch(signupFailed(data.errorMessage));
          toast.error(data.errorMessage);
        }
      });
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
    error: null,
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}

export function startLogout() {
  return {
    type: LOGOUT_START,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailed() {
  return {
    type: LOGOUT_FAILED,
    error: "Some error has occurred.",
  };
}
