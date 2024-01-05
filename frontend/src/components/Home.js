import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import Header from "./Header";
import Loading from "./Loading";
import CardElement from "./CardElement";
// import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClearIcon from "@mui/icons-material/Clear";

function Home(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selected_jobs, setSelectedJobs] = useState([]);
  const jobState = useSelector((state) => state.jobState);
  let jobs = jobState.jobs;
  useEffect(() => {
    setSelectedJobs(jobs);
    console.log(selected_jobs);
  }, [jobs]);
  const locations = [];
  for (let i of jobs) {
    if (!locations.includes(i.location)) {
      locations.push(i.location);
    }
  }

  const handleChange = (loc) => {
    if (loc == null) {
      setSelectedJobs(jobs);
      return;
    }
    let a = [];
    for (let j of jobs) {
      if (j.location == loc) {
        a.push(j);
      }
    }
    setSelectedJobs(a);
  };

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
      <Header />
      <button onClick={handleLogout}>LOGOUT</button>
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Box sx={{ flex: 2, p: 2 }}>
            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: "snow" }}>
              <Box sx={{ p: 1 }}>
                <Typography
                  component="h4"
                  sx={{ color: "black", fontWeight: 600, fontSize: 19 }}
                >
                  Filter job by location
                </Typography>
                <MenuList>
                  {locations &&
                    locations.map((location, i) => (
                      <MenuItem
                        key={i}
                        sx={{ color: "darkblue" }}
                        onClick={() => {
                          handleChange(location);
                        }}
                      >
                        <ListItemIcon>
                          <LocationOnIcon
                            sx={{ color: "black", fontSize: 18 }}
                          />
                        </ListItemIcon>
                        <Typography>{location}</Typography>
                      </MenuItem>
                    ))}
                  <MenuItem
                    key={locations.length + 1}
                    sx={{ color: "darkblue" }}
                    onClick={() => {
                      handleChange(null);
                    }}
                  >
                    <ListItemIcon>
                      <ClearIcon sx={{ color: "black", fontSize: 18 }} />
                    </ListItemIcon>
                    <Typography>Clear Filter</Typography>
                  </MenuItem>
                </MenuList>
              </Box>
            </Card>
          </Box>
          <Box sx={{ flex: 5, p: 2 }}>
            {jobState.inProgress ? (
              <Loading />
            ) : selected_jobs && selected_jobs.length > 0 ? (
              selected_jobs.map((job, i) => (
                <CardElement
                  key={i}
                  id={job._id}
                  jobTitle={job.title}
                  description={job.description}
                  location={job.location}
                />
              ))
            ) : (
              <Box
                sx={{
                  minHeight: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>No result found!</h2>
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;
