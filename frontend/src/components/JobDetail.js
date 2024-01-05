import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";

const JobDetail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [singleJob, setSingleJob] = useState({});
  const { id } = useParams();
  const jobState = useSelector((state) => state.jobState);
  const jobs = jobState.jobs;
  useEffect(() => {
    console.log(jobs);
    for (let i of jobs) {
      console.log(id);
      if (i._id == id) {
        setLoading(false);
        console.log(i);
        setSingleJob(i);
        break;
      }
    }
    return () => {
      setSingleJob({});
    };
  }, [id]);

  const applyForAJob = () => {
    // dispatch(
    //   userApplyJobAction({
    //     title: singleJob && singleJob.title,
    //     description: singleJob && singleJob.description,
    //     salary: singleJob && singleJob.salary,
    //     location: singleJob && singleJob.location,
    //   })
    // );
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa" }}>
        <Box sx={{ height: "85vh" }}>
          <Container sx={{ pt: "30px" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ flex: 4, p: 2 }}>
                {loading ? (
                  <Loading />
                ) : (
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3">
                        {singleJob && singleJob.title}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Salary
                        </Box>
                        : {singleJob && singleJob.salary}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Location
                        </Box>
                        : {singleJob && singleJob.location}
                      </Typography>
                      <Typography variant="body2" sx={{ pt: 2 }}>
                        <h3>Job Description:</h3>
                        {singleJob && singleJob.description}
                      </Typography>
                      {/* <Typography variant="body2" sx={{ pt: 2 }}>
                        <h3>Job Requirements:</h3>
                        {singleJob && singleJob.requirement}
                      </Typography> */}
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ flex: 1, p: 2 }}>
                <Card sx={{ p: 2 }}>
                  <Button
                    onClick={applyForAJob}
                    sx={{ fontSize: "13px" }}
                    variant="contained"
                  >
                    Apply for this Job
                  </Button>
                </Card>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default JobDetail;
