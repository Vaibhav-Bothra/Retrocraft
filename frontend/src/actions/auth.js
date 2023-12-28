import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "../actions/actionTypes";
import { getformbody } from "../helpers/utils";

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
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.success) {
          localStorage.setItem("token", data.token);
          dispatch(loginSuccess(data.user));
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
  number
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
      body: getformbody(
        name,
        email,
        password,
        file,
        gender,
        profession,
        number
      ),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(signupSuccess(data.user));
        } else {
          dispatch(signupFailed(data.errorMessage));
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
