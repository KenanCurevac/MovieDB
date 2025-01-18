import "./Pages.css";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../UI/Search";
import logo from "../assets/logofilmatlasfinal.png";

export default function RootLayout() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: "25px",
          overflow: "hidden",
          marginBottom: "2%",
        }}
      >
        <AppBar
          position="static"
          sx={{ height: "auto", backgroundColor: "#e6b5bb" }}
        >
          <Toolbar>
            <Link to="/">
              <img className="film-atlas" src={logo} alt="Film Atlas" />
            </Link>
            <Search />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexWrap: "nowrap",
                gap: "3%",
                alignItems: "center",
              }}
            >
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
      </Box>
      <main>
        <Outlet />
      </main>
    </>
  );
}
