import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ExpElement = ({ title, company, duration, description }) => {
  return (
    <Card sx={{ m: 1 }}>
      <CardContent>
        <Typography variant="body2" sx={{ fontSize: "15px" }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Title
          </Box>
          : {title}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "15px" }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Organisation Name
          </Box>
          : {company}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "15px" }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Duration
          </Box>
          : {duration}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "15px" }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Description
          </Box>
          : {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExpElement;
