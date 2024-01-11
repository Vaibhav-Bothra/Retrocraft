import { Typography, Box } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import StatComponent from "./StatComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loading from "./Loading";

const UserDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isLoggedIn) {
      if (auth.user.profession.toLowerCase() == "hire") setLoading(false);
      else navigate("/freelance/dashboard");
    } else navigate("/login");
  }, [auth]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
            Dashboard
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <StatComponent
              value={moment(auth.user.createdAt).format("YYYY / MM / DD")}
              icon={
                <CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />
              }
              description="Member since"
              money=""
            />
            <StatComponent
              value={auth.user.job.length}
              icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
              description="Number of jobs uploaded"
              money=""
            />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default UserDashboard;
