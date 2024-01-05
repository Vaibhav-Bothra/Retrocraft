import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      id="footer"
      component="footer"
      sx={{
        backgroundColor: "black",
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={12}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" color="whitesmoke" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="whitesmoke">
              We are Jobify, dedicated to providing the best jobs to every
              individual and the best employee to the hiring team.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" color="whitesmoke" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" color="whitesmoke">
              123 Main Street, Town, India
            </Typography>
            <Typography variant="body1" color="whitesmoke">
              Email: jobify@gmail.com
            </Typography>
            <Typography variant="body1" color="whitesmoke">
              Phone: 0890156xxxx
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" color="whitesmoke" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="rgb(255,255,255)">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="rgb(255,255,255)"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.linkedin.com/" color="rgb(255,255,255)">
              <LinkedIn />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body1" color="whitesmoke" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              JOBIFY
            </Link>{" "}
            2024
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
