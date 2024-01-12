import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import Button from "@mui/material/Button";
import { userApplyJobAction } from "../actions/jobs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const JobDetail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [singleJob, setSingleJob] = useState({});
  const jobState = useSelector((state) => state.jobState);
  const jobs = jobState.jobs;
  const [enable, setEnable] = useState(true);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    for (let i of jobs) {
      if (i._id == id) {
        setLoading(false);
        setSingleJob(i);
        break;
      }
    }
  }, [jobs]);

  const applyForAJob = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    if (auth.user.profession.toLowerCase() == "freelance") {
      dispatch(userApplyJobAction(id));
    } else {
      toast.warning("You cannot apply as you are hiring!!");
    }
    setEnable(false);
    // navigate("/");
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
                      <Typography variant="body2" sx={{ pt: 2 }}>
                        <Link to={`/user/${singleJob.producer}`}>Producer's Profile</Link>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ flex: 1, p: 2 }}>
                <Card sx={{ p: 2 }}>
                  <Button
                    disabled={!enable}
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
