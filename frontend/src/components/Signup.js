import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState();
  const [profession, setProfession] = useState("");
  const [validCredentials, setValid] = useState(true);
  const [strongValid, setStrongValid] = useState(true);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isStrongPassword(password)) {
      setStrongValid(false);
    }
    if (
      validator.isEmail(email) &&
      !validator.isEmpty(password) &&
      password === confirmPassword &&
      !validator.isEmpty(file) &&
      !validator.isEmpty(number) &&
      !validator.isEmpty(profession) &&
      !validator.isEmpty(gender) &&
      number.toString().length === 10 &&
      validator.isStrongPassword(password)
    ) {
      setValid(true);
      await dispatch(
        signUp(name, email, password, file, gender, profession, number)
      );
    } else {
      setValid(false);
    }
  };

  if (auth.isLoggedIn) {
    navigate("/", { replace: true });
    return;
  }

  return (
    <div>
      <form className="signup-form">
        <h1 className="login-signup-header">SIGN UP</h1>
        <ul className="wrapper">
          <li className="form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option selected>Select from dropdown</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </li>

          <li className="form-row">
            <label htmlFor="whattodo">What to do?</label>
            <select
              id="whatdo"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
            >
              <option selected>Select from dropdown</option>
              <option>Hire</option>
              <option>Freelance</option>
            </select>
          </li>

          <li className="form-row">
            <label htmlFor="phoneno">Phone Number</label>
            <input
              type="number"
              id="phoneno"
              required
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="pic">Profile Picture</label>
            <input
              type="file"
              id="pic"
              required
              onChange={(e) => {
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  console.log(reader.result);
                  setFile(reader.result);
                };
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="pass">Confirm Password</label>
            <input
              type="password"
              id="confirmpass"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </li>

          {!strongValid && (
            <div className="alert error-dialog">
              Required a strong password!!
            </div>
          )}

          {!validCredentials && (
            <div className="alert error-dialog">Invalid Credentials...</div>
          )}

          {auth.inProgress ? (
            <button
              disabled={auth.inProgress}
              onClick={handleFormSubmit}
              className="signupbtn"
            >
              Signing Up..
            </button>
          ) : (
            <button
              disabled={auth.inProgress}
              onClick={handleFormSubmit}
              className="signupbtn"
            >
              Sign Up
            </button>
          )}
        </ul>
      </form>
    </div>
  );
}

export default Signup;
