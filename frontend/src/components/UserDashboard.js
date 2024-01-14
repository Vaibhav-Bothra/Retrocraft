import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Input,
  Divider,
  Paper,
  experimental_sx,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import StatComponent from "./StatComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Loading from "./Loading";
import { addSkill } from "../actions/dashboard";
import ExpElement from "./ExpElement";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");
  const [exp, setExp] = useState([]);
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  let newSkill = "";
  useEffect(() => {
    let url = "http://127.0.0.1:5000/api/users/profile/" + id;
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser(data.user);
          console.log(data.user);
          if (data.user.profession == "hire")
            setDesc("Number of Jobs Uploaded");
          else setDesc("Number of Jobs Submitted");
          let s = "";
          for (let j = 0; j < data.user.skill.length; j++) {
            if (j == data.user.skill.length - 1) s = s + data.user.skill[j];
            else s = s + data.user.skill[j] + ", ";
          }
          setExp(data.user.experience);
          setSkill(s);
          setLoading(false);
          return;
        }
      });
  }, []);
  useEffect(() => {
    if (auth.isLoggedIn) {
      if (auth.user._id == id) {
        setUser(auth.user);
        setLoad(true);
        return;
      }
    }
  }, [auth]);

  const handleInputChange = (e) => {
    newSkill = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSkill(newSkill));
    window.location.reload(false);
  };

  const addExp = (e) => {
    e.preventDefault();
    navigate("/user/experience/add");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Typography variant="h4" sx={{ color: "navy", p: 2 }}>
            Dashboard
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 4, p: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      NAME
                    </Box>
                    : {user.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      EMAIL
                    </Box>
                    : {user.email}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      PROFESSION
                    </Box>
                    : {user.profession}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      CONTACT NUMBER
                    </Box>
                    : {user.number}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {load && (
              <Box sx={{ flex: 2, p: 2 }}>
                {user.profession.toLowerCase() == "freelance" && (
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
                      placeholder="Skill Name"
                      required
                      onChange={handleInputChange}
                    />
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <Button
                      onClick={handleSubmit}
                      sx={{ fontSize: "13px", m: 1 }}
                      variant="contained"
                    >
                      Add Skill
                    </Button>
                  </Paper>
                )}
                <Button
                  onClick={addExp}
                  sx={{ fontSize: "14px", m: 1, mt: 2 }}
                  variant="contained"
                >
                  Add Experience
                </Button>
              </Box>
            )}
          </Stack>
          {user.skill.length > 0 && (
            <Card sx={{ m: 1 }}>
              <CardContent>
                <Typography variant="body2" sx={{ fontSize: "17px" }}>
                  <Box component="h3" sx={{ fontWeight: 600 }}>
                    Skills:
                  </Box>
                  {skill}
                </Typography>
              </CardContent>
            </Card>
          )}
          <Box sx={{ p: 2 }}>
            {exp.length > 0 && (
              <Typography variant="body2" sx={{ fontSize: "17px" }}>
                <Box component="h3" sx={{ fontWeight: 600 }}>
                  Previous Experiences:
                </Box>
              </Typography>
            )}
            {exp.length > 0 &&
              exp.map((ex, i) => (
                <ExpElement
                  key={i}
                  title={ex.title}
                  description={ex.description}
                  company={ex.company}
                  duration={ex.duration}
                />
              ))}
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ m: 1 }}
          >
            <StatComponent
              value={user && moment(user.createdAt).format("YYYY / MM / DD")}
              icon={
                <CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />
              }
              description="Member since"
            />
            <StatComponent
              value={
                user.profession == "hire"
                  ? user.job.length
                  : user.jobsHistory.length
              }
              icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
              description={desc}
            />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default UserDashboard;
