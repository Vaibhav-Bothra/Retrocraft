import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { signIn, clearAuthState } from "../actions/auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const [validCredentials, setValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(clearAuthState());
  }, [dispatch]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validator.isEmail(email) && !validator.isEmpty(password)) {
      setValid(true);
      dispatch(signIn(email, password));
      console.log(auth);
      if (auth.isLoggedIn) {
        navigate("http://localhost:3000/", { replace: true });
      }
    } else {
      setValid(false);
    }
  };

  if (auth.isLoggedIn) {
    navigate("/", { replace: true });
    return;
  } else {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {auth.error && <div className="alert error-dailog">{auth.error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        {!validCredentials && (
          <div className="alert error-dialog">Incorrect Email/Password</div>
        )}
        <div className="field">
          {auth.inProgress ? (
            <button disabled={auth.inProgress} onClick={handleFormSubmit}>
              Logging In..
            </button>
          ) : (
            <button disabled={auth.inProgress} onClick={handleFormSubmit}>
              Log In
            </button>
          )}
          <div className="field">Not have an Account?</div>
        </div>
      </form>
    );
  }
}

export default Login;
