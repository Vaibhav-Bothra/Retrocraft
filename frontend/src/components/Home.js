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
  Input,
  styled,
  Typography,
} from "@mui/material";
import Loading from "./Loading";
import CardElement from "./CardElement";
import UserCardElement from "./UserCardElement";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import headerimage from "../images/headerimage.jpg";
import headerposter from "../images/header-poster.jpg";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";

function Home(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selected_jobs, setSelectedJobs] = useState([]);
  const [selected_users, setSelectedUsers] = useState([]);
  const jobState = useSelector((state) => state.jobState);
  const [profession, setProfession] = useState(0);
  let jobs = jobState.jobs;
  const [users, setUsers] = useState([]);
  let searchValue = "";

  useEffect(() => {
    let url = "http://127.0.0.1:5000/api/users/all";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((respponse) => respponse.json())
      .then((data) => {
        if (data.success) {
          console.log(data.users);
          setUsers(data.users);
        }
      });
  }, []);

  useEffect(() => {
    setSelectedUsers(users);
    if (auth.isLoggedIn) {
      const jobHistory = auth.user.jobsHistory;
      if (auth.user.profession.toLowerCase() == "hire") {
        setProfession(1);
      }
      const jobsId = [];
      for (let j of jobHistory) {
        jobsId.push(j.job);
      }
      let a = [];
      for (let i of jobs) {
        if (!jobsId.includes(i._id)) {
          a.push(i);
        }
      }
      setSelectedJobs(a);
    } else {
      setSelectedJobs(jobs);
    }
  }, [jobs, auth, users]);

  const skills = [];
  const locations = [];
  for (let i of jobs) {
    if (!locations.includes(i.location)) {
      locations.push(i.location);
    }
  }

  for (let i of users) {
    for (let j = 0; j < i.skill.length; j++) {
      if (!skills.includes(i.skill[j])) skills.push(i.skill[j]);
    }
  }

  const StyleHeader = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 450,
    backgroundImage: `url(${headerimage})`,
    backgroundSize: "75%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "grey",
  }));

  const handleSkill = (skill) => {
    if (skill == null) {
      setSelectedUsers(users);
      return;
    }
    let user = [];
    for (let i of users) {
      if (i.skill.includes(skill)) user.push(i);
    }
    setSelectedUsers(user);
  };

  const handleChange = (loc) => {
    if (loc == null) {
      if (!auth.isLoggedIn) {
        setSelectedJobs(jobs);
        return;
      }
      const jobHistory = auth.user.jobsHistory;
      const jobsId = [];
      for (let j of jobHistory) {
        jobsId.push(j.job);
      }
      let a = [];
      for (let i of jobs) {
        if (!jobsId.includes(i._id)) {
          a.push(i);
        }
      }
      setSelectedJobs(a);
      return;
    }
    if (auth.isLoggedIn) {
      const jobHistory = auth.user.jobsHistory;
      const jobsId = [];
      for (let j of jobHistory) {
        jobsId.push(j.job);
      }
      let a = [];
      for (let j of jobs) {
        if (!jobsId.includes(j._id) && j.location == loc) {
          a.push(j);
        }
      }
      setSelectedJobs(a);
    } else {
      let a = [];
      for (let j of jobs) {
        if (j.location == loc) {
          a.push(j);
        }
      }
      setSelectedJobs(a);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
    let a = [];
    for (let j of jobs) {
      let lowercaseTitle = j.title.toLowerCase();
      if (lowercaseTitle.includes(searchValue)) {
        a.push(j);
      }
    }
    setSelectedJobs(a);
  };

  const handleInputChange = (e) => {
    searchValue = e.target.value;
  };

  return (
    <div>
      {profession == 0 ? (
        <StyleHeader>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              bgcolor: "whitesmoke",
            }}
          >
            <Input
              type="text"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for Jobs"
              required
              onChange={handleInputChange}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </StyleHeader>
      ) : (
        <img src={headerposter} style={{ height: "80vh", width: "100%" }} />
      )}
      {profession == 0 ? (
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
      ) : (
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
                    Filter job by Skills
                  </Typography>
                  <MenuList>
                    {skills &&
                      skills.map((skill, i) => (
                        <MenuItem
                          key={i}
                          sx={{ color: "darkblue" }}
                          onClick={() => {
                            handleSkill(skill);
                          }}
                        >
                          <ListItemIcon>
                            <WorkIcon sx={{ color: "black", fontSize: 18 }} />
                          </ListItemIcon>
                          <Typography>{skill}</Typography>
                        </MenuItem>
                      ))}
                    <MenuItem
                      key={locations.length + 1}
                      sx={{ color: "darkblue" }}
                      onClick={() => {
                        handleSkill(null);
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
              {selected_users && selected_users.length > 0 ? (
                selected_users.map((user, i) => (
                  <UserCardElement
                    key={i}
                    id={user._id}
                    name={user.name}
                    description={user.description}
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
      )}
    </div>
  );
}

export default Home;
