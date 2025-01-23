import "./Pages.css";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../UI/Search";
import logo from "../assets/logofilmatlasfinal.png";

export default function RootLayout() {
  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/">
            <img className="film-atlas" src={logo} alt="Film Atlas" />
          </Link>
          <Search />
          <Typography variant="h6" component="div" className="navbar-menu">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/movies" className="link">
              Movies
            </Link>
            <Link to="/tvshows" className="link">
              TV Series
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
