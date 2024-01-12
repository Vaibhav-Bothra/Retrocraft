import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemIcon } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WorkIcon from "@mui/icons-material/Work";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutFailed, logoutSuccess, startLogout } from "../actions/auth";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const pages = [
    "Home",
    "Notification Feed",
    "Find Jobs",
    "Contact Us",
    "About Us",
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const routes = ["/login", "/signup"];
  let id = "";

  useEffect(() => {
    if (auth.isLoggedIn) id = auth.user._id;
    console.log(id);
  }, [auth]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(startLogout());
    let url = "http://127.0.0.1:5000/api/users/logout";
    localStorage.removeItem("token");
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(logoutSuccess());
          navigate("/", { replace: true });
        } else {
          dispatch(logoutFailed());
        }
      });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Container>
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBIFY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, mr: 2, color: "white", display: "block" }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                HOME
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, mr: 2, color: "white", display: "block" }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                NOTIFICATION FEED
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, mr: 2, color: "white", display: "block" }}
            >
              {localStorage.getItem("token") &&
              auth.user.profession == "hire" ? (
                <Link
                  to="/job/upload"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  UPLOAD JOBS
                </Link>
              ) : (
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  FIND JOBS
                </Link>
              )}
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                CONTACT US
              </Link>
            </Button>
          </Box>

          {auth.isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ ml: 2 }}
                  size="small"
                >
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <Link to={`/user/${auth.user._id}`}>Dashboard</Link>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!auth.isLoggedIn && !routes.includes(pathname) && (
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Button variant="contained" sx={{ my: 2, mr: 2 }}>
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  LOGIN
                </Link>
              </Button>
              <Button variant="contained" sx={{ my: 2 }}>
                <Link
                  to="/signup"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  SIGNUP
                </Link>
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <ToastContainer />
    </AppBar>
  );
}
export default Navbar;
