import * as React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const WorkElement = ({
  jobTitle,
  description,
  location,
  id,
  status,
  salary,
  requirement,
}) => {
  return (
    <Box sx={{ bgcolor: "#fafafa" }}>
      <Box sx={{ height: "35vh" }}>
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 4, p: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    {jobTitle}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Salary
                    </Box>
                    : {salary}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Location
                    </Box>
                    : {location}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Description
                    </Box>
                    : {description}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Requirements
                    </Box>
                    : {requirement}
                  </Typography>
                  <Typography variant="body2" sx={{ pt: 2 }}>
                    <Link to={`/user/${id}`}>Producer's Profile</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              {status.toLowerCase() == "pending" && (
                <Card sx={{ p: 2, fontSize: 23, bgcolor: "#FCECD9", mt: 4 }}>
                  Pending
                </Card>
              )}
              {status.toLowerCase() == "accepted" && (
                <Card sx={{ p: 2, fontSize: 23, bgcolor: "green", mt: 4 }}>
                  Accepted
                </Card>
              )}
              {status.toLowerCase() == "rejected" && (
                <Card sx={{ p: 2, fontSize: 23, bgcolor: "red", mt: 4 }}>
                  Rejected
                </Card>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default WorkElement;
