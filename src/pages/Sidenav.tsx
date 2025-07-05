import "./Sidenav.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import logo from "../assets/logofilmatlasfinal.png";
import useMediaQuery from "@mui/material/useMediaQuery";

type SidenavProps = {
  openDrawer: boolean;
  toggleDrawer: (open: boolean) => void;
};

export default function Sidenav({ openDrawer, toggleDrawer }: SidenavProps) {
  const closeDrawer = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    if (closeDrawer) {
      toggleDrawer(false);
    }
  }, [closeDrawer]);

  return (
    <Drawer
      open={openDrawer}
      onClose={() => toggleDrawer(false)}
      anchor="right"
    >
      <div className="sidenav-content">
        <img src={logo} alt="Film Atlas logo" className="drawer-logo" />
        <Button
          className="drawer-close-button"
          onClick={() => toggleDrawer(false)}
        >
          <CloseIcon />
        </Button>
        <div className="drawer-links">
          <Link
            to="/"
            className="drawer-link"
            onClick={() => toggleDrawer(false)}
          >
            <HomeIcon /> Home
          </Link>
          <Link
            to="/movies"
            className="drawer-link"
            onClick={() => toggleDrawer(false)}
          >
            <TheatersIcon /> Movies
          </Link>
          <Link
            to="/tvshows"
            className="drawer-link tv-series-link"
            onClick={() => toggleDrawer(false)}
          >
            <LiveTvIcon /> TV Series
          </Link>
        </div>
      </div>
    </Drawer>
  );
}
