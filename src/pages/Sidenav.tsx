import "./Pages.css";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type SidenavProps = {
  openDrawer: boolean;
  toggleDrawer: (open: boolean) => void;
};

export default function Sidenav({ openDrawer, toggleDrawer }: SidenavProps) {
  return (
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
      <Link to="/" className="drawer-link" onClick={() => toggleDrawer(false)}>
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
  );
}
