import * as React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const UserElement = ({ user, job }) => {
  //   const handleAccept = () => {
  //     let url = "http://127.0.0.1:5000/api/users/acceptjob";
  //     fetch(url, {
  //       method: "POST",
  //       credentials: "include",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   };

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
                    // onChange={handleAccept}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{ fontSize: "15px" }}
                    variant="contained"
                    color="error"
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
