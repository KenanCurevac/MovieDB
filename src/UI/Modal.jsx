import "./Modal.css";
import { useCallback } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useFetch from "../hooks/useFetch";
import { fetchDetails } from "../http";
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
          {fetchedData.title || "No Title"}{" "}
          <span>
            ({releaseYear}
            {endYear && releaseYear !== endYear ? ` - ${endYear}` : ""})
          </span>
        </div>
        <div className="modal-tagline">{fetchedData.tagline}</div>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        className="modal-close-button"
      >
        <CloseIcon className="modal-close-icon" />
      </IconButton>
      <img
        className="modal-picture"
        loading="lazy"
        src={
          fetchedData.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${fetchedData.backdrop_path}`
            : noPicture
        }
        alt="image"
      />
      <DialogContent className="modal-content">
        <div className="modal-data">
          <div className="modal-data-left-side">
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

          <div className="modal-data-right-side chips">
            {genres.map((genre) => (
              <Chip key={genre} label={genre} variant="outlined" />
            ))}
          </div>

          <div className="modal-data-left-side">
            <span style={{ fontSize: "20px" }}>Rating: </span>
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              {fetchedData.vote_average.toFixed(1) || "No Data"}
            </span>
          </div>

          <div className="modal-data-right-side">
            <span style={{ fontSize: "20px" }}>Number of Votes: </span>
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              {fetchedData.vote_count || "No Data"}
            </span>
          </div>
        </div>

        <div className="modal-description">
          {fetchedData.overview || "No Data"}
        </div>
      </DialogContent>
    </Dialog>
  );
}
