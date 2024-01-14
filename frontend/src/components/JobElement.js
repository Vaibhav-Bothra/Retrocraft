import * as React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Button from "@mui/material/Button";
import UserElement from "./UserElement";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const JobElement = ({ job }) => {
  return (
    <Box sx={{ bgcolor: "#fafafa" }}>
      <Box sx={{ height: "48vh" }}>
        <Container>
          <Stack direction={{ sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Box sx={{ flex: 4, p: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    {job.title}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Salary
                    </Box>
                    : {job.salary}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      Location
                    </Box>
                    : {job.location}
                  </Typography>
                  <Typography variant="body2">
                    <h3>Description:</h3>
                    {job.description}
                  </Typography>
                  <Typography variant="body2">
                    <h3>Requirements:</h3>
                    {job.requirement}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Button sx={{ fontSize: "15px", mt: 5 }} variant="contained">
                Delete
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
      {job.user.length > 0 &&
        job.user.map((user, i) => {
          return <UserElement key={i} user={user} job={job} />;
        })}
      <hr></hr>
    </Box>
  );
};

export default JobElement;
