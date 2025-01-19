import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./PeopleModal.css";
import useFetch from "../hooks/useFetch";
import { fetchDetails } from "../http";
import { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function PeopleModal({ open, onClose, media, id }) {
  const details = useCallback(() => {
    if (id) {
      return fetchDetails(media, id);
    }
    return null;
  }, [id]);

  const { fetchedData, isFetching, error } = useFetch(details);

  const dateOfBirthString = fetchedData?.birthday || null;
  const [year, month, day] = dateOfBirthString
    ? dateOfBirthString.split("-")
    : [];
  const dateOfBirth = year ? `${day}.${month}.${year}` : null;

  const dateOfDeathString = fetchedData?.deathday || null;
  const [yearOfDeath, monthOfDeath, dayOfDeath] = dateOfDeathString
    ? dateOfDeathString.split("-")
    : [];
  const dateOfDeath = yearOfDeath
    ? `${dayOfDeath}.${monthOfDeath}.${yearOfDeath}`
    : null;

  if (!fetchedData) {
    return null;
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      disableRestoreFocus
      className="people-modal"
    >
      <DialogTitle className="people-dialog-title">
        <div className="modal-title-people">{fetchedData.name}</div>
      </DialogTitle>
      <IconButton aria-label="close" onClick={onClose} className="close-button">
        <CloseIcon className="custom-close-icon" />
      </IconButton>
      <DialogContent className="dialog-content-people">
        <div className="people-modal-top">
          <img
            className="people-picture"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${fetchedData.profile_path}`}
            alt="image"
          />
          <div className="people-data-display">
            <div className="people-data">
              {fetchedData.known_for_department}
            </div>
            <div>
              Date of Birth: <span className="people-data">{dateOfBirth}</span>
            </div>
            {dateOfDeath && (
              <div>
                Date of Death:{" "}
                <span className="people-data">{dateOfDeath}</span>
              </div>
            )}
            <div>
              Place of Birth:{" "}
              <span className="people-data">{fetchedData.place_of_birth}</span>
            </div>
          </div>
        </div>
        <div className="people-description">{fetchedData.biography}</div>
      </DialogContent>
    </Dialog>
  );
}
