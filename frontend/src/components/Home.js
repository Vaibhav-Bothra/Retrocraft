import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

function Home(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    let url = "http://127.0.0.1:5000/api/users/logout";
    localStorage.removeItem("token");
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default Home;
