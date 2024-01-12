import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { addJob } from "../actions/jobs";

function UploadJob(props) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [req, setReq] = useState("");
  const [salary, setSalary] = useState("");
  const [validCredentials, setValid] = useState(true);
  const auth = useSelector((state) => state.auth);
  const addJobState = useSelector((state) => state.addJobState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !validator.isEmpty(description) &&
      !validator.isEmpty(title) &&
      !validator.isEmpty(salary) &&
      !validator.isEmpty(req) &&
      !validator.isEmpty(location)
    ) {
      setValid(true);
      await dispatch(addJob(title, description, location, salary, req));
      navigate("/", { replace: true });
    } else {
      setValid(false);
    }
  };

  return (
    <div>
      <form className="signup-form">
        <h1 className="add-header">JOB</h1>
        <ul className="wrapper">
          <li className="form-row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="desc"
              required
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="gender">Salary</label>
            <input
              type="text"
              id="salary"
              required
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              required
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="req">Requirements</label>
            <input
              type="text"
              id="req"
              required
              onChange={(e) => {
                setReq(e.target.value);
              }}
            />
          </li>

          {!validCredentials && (
            <div className="alert error-dialog">Invalid Credentials...</div>
          )}

          {addJobState.inProgress ? (
            <button
              disabled={addJobState.inProgress}
              onClick={handleFormSubmit}
              className="addbtn"
            >
              Adding ..
            </button>
          ) : (
            <button
              disabled={addJobState.inProgress}
              onClick={handleFormSubmit}
              className="addbtn"
            >
              Add
            </button>
          )}
        </ul>
      </form>
    </div>
  );
}

export default UploadJob;
