import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExp } from "../actions/dashboard";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { DashboardCustomize } from "@mui/icons-material";

function Experience(props) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDesc] = useState("");
  const auth = useSelector((state) => state.auth);
  const dashboard = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const [validCredentials, setValid] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [auth]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !validator.isEmpty(description) &&
      !validator.isEmpty(title) &&
      !validator.isEmpty(company) &&
      !validator.isEmpty(duration)
    ) {
      setValid(true);
      dispatch(addExp(title, company, duration, description));
      navigate("/", { replace: true });
    } else {
      setValid(false);
    }
  };

  return (
    <div>
      <form className="signup-form">
        <h1 className="add-header">EXPERIENCE</h1>
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
            <label htmlFor="company">Organisation Name</label>
            <input
              type="text"
              id="company"
              required
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </li>

          <li className="form-row">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              required
              onChange={(e) => {
                setDuration(e.target.value);
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
          {!validCredentials && (
            <div className="alert error-dialog">Invalid Credentials...</div>
          )}
          <button
            disabled={dashboard.inProgress}
            onClick={handleFormSubmit}
            className="addbtn"
          >
            ADD
          </button>
        </ul>
      </form>
    </div>
  );
}

export default Experience;
