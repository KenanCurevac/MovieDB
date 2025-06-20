import "./Root.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../UI/Search";
import logo from "../assets/logofilmatlasfinal.png";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Sidenav from "./Sidenav";

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
          <Sidenav openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
