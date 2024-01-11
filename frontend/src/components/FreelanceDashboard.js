import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Input,
  Divider,
  Paper,
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

const FreelanceDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let newSkill = "";
  useEffect(() => {
    if (auth.isLoggedIn) {
      if (auth.user.profession.toLowerCase() == "freelance") setLoading(false);
      else navigate("/hire/dashboard");
    } else navigate("/login");
  }, [auth]);

  const handleInputChange = (e) => {
    newSkill = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSkill(newSkill));
  };

  const addExp = (e) => {
    e.preventDefault();
    navigate("/user/experience/add", { replace: true });
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
                    : {auth.user.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      EMAIL
                    </Box>
                    : {auth.user.email}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      PROFESSION
                    </Box>
                    : {auth.user.profession}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      CONTACT NUMBER
                    </Box>
                    : {auth.user.number}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ flex: 2, p: 2 }}>
              <Button
                //   disabled={!enable}
                onClick={addExp}
                sx={{ fontSize: "14px", m: 1 }}
                variant="contained"
              >
                Add Experience
              </Button>
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
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button
                  onClick={handleSubmit}
                  sx={{ fontSize: "13px", m: 1 }}
                  variant="contained"
                >
                  Add Skill
                </Button>
              </Paper>
            </Box>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ m: 1 }}
          >
            <StatComponent
              value={
                auth.user &&
                moment(auth.user.createdAt).format("YYYY / MM / DD")
              }
              icon={
                <CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />
              }
              description="Member since"
            />
            <StatComponent
              value={auth.user && auth.user.jobsHistory.length}
              icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
              description="Number of jobs submitted"
            />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default FreelanceDashboard;
