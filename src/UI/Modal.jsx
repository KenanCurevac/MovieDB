import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./Modal.css";
import useFetch from "../hooks/useFetch";
import { fetchDetails } from "../http";
import { useCallback } from "react";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DataStatus from "../tvseries-pages/DataStatus";
import noPicture from "../assets/no-image-available.jpg";

export default function Modal({ open, onClose, media, id }) {
  const details = useCallback(() => {
    if (id) {
      return fetchDetails(media, id);
    }
    return null;
  }, [id]);

  const { fetchedData, isFetching, error } = useFetch(details);

  const releaseYear = fetchedData?.release_date
    ? fetchedData.release_date.split("-")[0]
    : fetchedData?.first_air_date
    ? fetchedData.first_air_date.split("-")[0]
    : null;

  const endYear = fetchedData?.last_air_date
    ? fetchedData.last_air_date.split("-")[0]
    : null;

  const hours = `${Math.trunc(fetchedData?.runtime / 60)}h`;
  const minutes = `${fetchedData?.runtime % 60}min`;
  const runtime = `${hours} ${minutes}`;

  const genres = fetchedData?.genres.map((genre) => genre.name);

  if (!open) {
    return null;
  }

  const statusMessage = (
    <DataStatus
      fetchedData={fetchedData}
      isFetching={isFetching}
      error={error}
      subject={media === "movie" ? "Movies" : "Shows"}
    />
  );

  if (isFetching || error || !fetchedData || fetchedData.length === 0) {
    return statusMessage;
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      disableRestoreFocus
      className="standard-modal"
    >
      <DialogTitle>
        <div className="modal-title">
          {fetchedData.title ||
            fetchedData.original_title ||
            fetchedData.name ||
            fetchedData.original_name ||
            "title"}{" "}
          <span>
            ({releaseYear}
            {endYear && releaseYear !== endYear ? ` - ${endYear}` : ""})
          </span>
        </div>
        <div className="modal-undertitle">{fetchedData.tagline}</div>
      </DialogTitle>
      <IconButton aria-label="close" onClick={onClose} className="close-button">
        <CloseIcon className="custom-close-icon" />
      </IconButton>
      <img
        className="modal-picture"
        loading="lazy"
        src={
          fetchedData.backdrop_path || fetchedData.poster_path
            ? `https://image.tmdb.org/t/p/w500${
                fetchedData.backdrop_path || fetchedData.poster_path
              }`
            : noPicture
        }
        alt="image"
      />
      <DialogContent className="dialog-content">
        <div className="movie-modal-data">
          <div className="left-element first-element">
            {fetchedData.runtime && (
              <div>
                <span style={{ fontSize: "17px" }}>Runtime: </span>
                <span style={{ fontSize: "22px" }}>{runtime || "No Data"}</span>
              </div>
            )}
            {fetchedData.number_of_seasons && (
              <div>
                <span style={{ fontSize: "17px" }}>Seasons: </span>
                <span style={{ fontSize: "22px" }}>
                  {fetchedData.number_of_seasons || "No Data"}
                </span>
              </div>
            )}
            {fetchedData.number_of_episodes && (
              <div>
                <span style={{ fontSize: "17px" }}>Episodes: </span>
                <span style={{ fontSize: "22px" }}>
                  {fetchedData.number_of_episodes || "No Data"}
                </span>
              </div>
            )}
          </div>

          <div className="right-element chips">
            {genres.map((genre) => (
              <Chip key={genre} label={genre} variant="outlined" />
            ))}
          </div>

          <div className="left-element">
            <span className="lower-row-data">Rating: </span>
            <span className="big-numbers">
              {fetchedData.vote_average.toFixed(1) || "No Data"}
            </span>
          </div>

          <div className="right-element">
            <span className="lower-row-data">Number of Votes: </span>
            <span className="big-numbers">
              {fetchedData.vote_count || "No Data"}
            </span>
          </div>
        </div>

        <div className="description">{fetchedData.overview || "No Data"}</div>
      </DialogContent>
    </Dialog>
  );
}
