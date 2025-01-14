import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./Modal.css";
import useFetch from "../hooks/useFetch";
import { fetchDetails } from "../http";
import { useCallback } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ open, onClose, media, id }) {
  const details = useCallback(() => {
    if (id) {
      return fetchDetails(media, id);
    }
    return null;
  }, [id]);

  const { fetchedData, isFetching, error } = useFetch(details);
  console.log(fetchedData, "detalji");

  const releaseYear = fetchedData?.release_date
    ? fetchedData.release_date.split("-")[0]
    : null;

  const hours = `${Math.trunc(fetchedData?.runtime / 60)}h`;
  const minutes = `${fetchedData?.runtime % 60}min`;
  const runtime = `${hours} ${minutes}`;

  const genres = fetchedData?.genres.map((genre) => genre.name);

  if (!fetchedData) {
    return null;
  }

  return (
    <Dialog onClose={onClose} open={open} disableRestoreFocus>
      <DialogTitle>
        <div className="modal-title">
          {fetchedData.title || fetchedData.original_title || "title"} (
          {releaseYear})
        </div>
        <div className="modal-undertitle">{fetchedData.tagline}</div>
      </DialogTitle>
      <IconButton aria-label="close" onClick={onClose} className="close-button">
        <CloseIcon className="custom-close-icon" />
      </IconButton>
      <img
        className="modal-picture"
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w500${
          fetchedData.backdrop_path || fetchedData.poster_path
        }`}
        alt="image"
      />
      <DialogContent className="dialog-content">
        <div className="upper-row">
          <div>
            Runtime: <span className="small-green">{runtime}</span>
          </div>
          <Stack direction="row" spacing={1}>
            {genres.map((genre) => (
              <Chip key={genre} label={genre} variant="outlined" />
            ))}
          </Stack>
        </div>
        <div className="lower-row">
          <div>
            Rating:{" "}
            <span className="green">{fetchedData.vote_average.toFixed(1)}</span>
          </div>
          <div>
            Number of Votes:{" "}
            <span className="green">{fetchedData.vote_count}</span>
          </div>
        </div>
        <div className="description">{fetchedData.overview}</div>
      </DialogContent>
    </Dialog>
  );
}
