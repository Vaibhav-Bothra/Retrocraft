import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import JobDetail from "./JobDetail";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import { authenticateUser } from "../actions/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  fetchJobsFailed,
  fetchJobsStart,
  fetchJobsSuccess,
} from "../actions/jobs";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      const userId = user.id;
      let url = "http://127.0.0.1:5000/api/users/profile/" + user.id;
      fetch(url, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            localStorage.removeItem("token");
          } else {
            dispatch(authenticateUser(data.user));
          }
        });
    }
    dispatch(fetchJobsStart());
    let url = "http://127.0.0.1:5000/api/jobs";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(fetchJobsSuccess(data.jobs));
        } else if (data.error) {
          dispatch(fetchJobsFailed(data.error));
        }
      });
  }, []);
  const auth = useSelector((state) => state.auth);
  // console.log(props);
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/job/:id" Component={JobDetail} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
