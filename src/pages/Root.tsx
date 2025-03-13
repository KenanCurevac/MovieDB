import "./Pages.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../UI/Search";
import logo from "../assets/logofilmatlasfinal.png";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function RootLayout() {
  const [openDrawer, setOpenDrawer] = useState(false);

  function toggleDrawer(newOpen: boolean) {
    setOpenDrawer(newOpen);
  }

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/">
            <img className="film-atlas" src={logo} alt="Film Atlas Logo" />
          </Link>
          <div className="navbar-content">
            <Search />
            <Typography
              variant="h6"
              component="div"
              className="navbar-menu-links"
            >
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/movies" className="link">
                Movies
              </Link>
              <Link to="/tvshows" className="link tv-series-link">
                TV Series
              </Link>
            </Typography>
          </div>
          <Button onClick={() => toggleDrawer(true)} className="mobile-menu">
            <MenuIcon />
          </Button>
          <Drawer
            open={openDrawer}
            onClose={() => toggleDrawer(false)}
            anchor="right"
          >
            <Button
              className="drawer-close-button"
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon />
            </Button>
            <Link
              to="/"
              className="drawer-link"
              onClick={() => toggleDrawer(false)}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="drawer-link"
              onClick={() => toggleDrawer(false)}
            >
              Movies
            </Link>
            <Link
              to="/tvshows"
              className="drawer-link tv-series-link"
              onClick={() => toggleDrawer(false)}
            >
              TV Series
            </Link>
          </Drawer>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
