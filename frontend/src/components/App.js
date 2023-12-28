import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import { authenticateUser } from "../actions/auth";

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
  }, []);
  const auth = useSelector((state) => state.auth);
  // console.log(props);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
