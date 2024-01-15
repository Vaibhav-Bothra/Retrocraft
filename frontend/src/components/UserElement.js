import * as React from "react";
import { useEffect } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { accrejJob } from "../actions/jobs";

const UserElement = ({ user, job }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const acceptJobState = useSelector((state) => state.acceptJobState);

  const handleAccept = () => {
    dispatch(accrejJob("accepted", user.user._id, job._id));
    window.location.reload(false);
  };

  const handleReject = () => {
    dispatch(accrejJob("rejected", user.user._id, job._id));
    window.location.reload(false);
  };

  return (
    <Box sx={{ bgcolor: "#fafafa" }}>
      <Box sx={{ height: "35vh" }}>
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 3, p: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    {user.user.name}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Description
                    </Box>
                    : {user.user.description}
                  </Typography>
                  <Typography variant="body2" sx={{ pt: 2 }}>
                    <Link to={`/user/${user.user._id}`}>Artist's Profile</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              {user.applicationStatus.toLowerCase() == "pending" && (
                <Box sx={{ flex: 1, p: 2 }}>
                  <Button
                    sx={{ fontSize: "15px", mr: 1 }}
                    variant="contained"
                    color="success"
                    disabled={acceptJobState.inProgress}
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{ fontSize: "15px" }}
                    variant="contained"
                    color="error"
                    disabled={acceptJobState.inProgress}
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </Box>
              )}
              {user.applicationStatus.toLowerCase() == "accepted" && (
                <Card sx={{ p: 2, fontSize: 23, bgcolor: "green" }}>
                  Accepted!!
                </Card>
              )}
              {user.applicationStatus.toLowerCase() == "rejected" && (
                <Card sx={{ p: 2, fontSize: 23, bgcolor: "red" }}>
                  Rejected!!
                </Card>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default UserElement;
