import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WorkElement from "./WorkElement";
import JobElement from "./JobElement";
import { Box } from "@mui/material";

function NotificationFeed(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [jobHistory, setJobHistory] = useState([]);
  const [job, setJob] = useState([]);

  useEffect(() => {
    let url = "http://127.0.0.1:5000/api/users/fetchjobs";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.user.jobsHistory);
          setJobHistory(data.user.jobsHistory);
          setJob(data.user.job);
        } else {
          navigate("/", { replace: true });
        }
      });
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {jobHistory.length > 0 &&
        jobHistory.map((jobHis, i) => {
          return (
            <WorkElement
              key={i}
              id={jobHis.job.producer}
              jobTitle={jobHis.job.title}
              description={jobHis.job.description}
              location={jobHis.job.location}
              salary={jobHis.job.salary}
              requirement={jobHis.job.requirement}
              status={jobHis.applicationStatus}
            />
          );
        })}
      {job.length > 0 &&
        job.map((job1, i) => {
          return <JobElement key={i} job={job1} />;
        })}
    </Box>
  );
}

export default NotificationFeed;
