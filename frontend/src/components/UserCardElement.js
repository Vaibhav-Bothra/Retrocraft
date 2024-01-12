import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const UserCardElement = ({ name, description, id }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: "whitesmoke" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: "teal" }}>
          {name}
        </Typography>
        <Typography variant="body2">
          Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disableElevation
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            to={`/user/${id}`}
          >
            More Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCardElement;
