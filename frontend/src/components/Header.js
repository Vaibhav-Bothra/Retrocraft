import { Box, Input, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import headerimage from "../images/headerimage.jpg";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import SearchInputEl from './SearchInputEl';

function Header(props) {
  let searchValue = "";

  const handleSubmit = (e) => {
    console.log(searchValue);
  };
  const handleChange = (e) => {
    searchValue = e.target.value;
  };
  const StyleHeader = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 450,
    backgroundImage: `url(${headerimage})`,
    backgroundSize: "75%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "grey",
  }));

  return (
    <div>
      <StyleHeader>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            bgcolor: "whitesmoke",
          }}
        >
          <Input
            type="text"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for Jobs"
            required
            onChange={handleChange}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </StyleHeader>
    </div>
  );
}

export default Header;
