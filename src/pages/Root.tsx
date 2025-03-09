import "./Pages.css";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../UI/Search";
import logo from "../assets/logofilmatlasfinal.png";
import HomeIcon from "@mui/icons-material/Home";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LiveTvIcon from "@mui/icons-material/LiveTv";

export default function RootLayout() {
  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Link to="/">
            <img className="film-atlas" src={logo} alt="Film Atlas Logo" />
          </Link>
          <Search />
          <Typography variant="h6" component="div" className="navbar-menu-text">
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
          <Typography
            variant="h6"
            component="div"
            className="navbar-menu-icons"
          >
            <Link to="/" className="navbar-icon">
              <HomeIcon />
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
