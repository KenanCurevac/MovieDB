import "./PeopleModal.css";
import { useCallback } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useFetch from "../hooks/useFetch";
import { fetchDetails } from "../http";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DataStatus from "../subpages/DataStatus";
import noPicture from "../assets/placeholder.jpg";
import { PersonDetails } from "../models/personDetails";

type PeopleModalProps = {
  open: boolean;
  onClose: () => void;
  media: string;
  id: number;
};

export default function PeopleModal({
  open,
  onClose,
  media,
  id,
}: PeopleModalProps) {
  const details = useCallback(() => {
    if (id) {
      return fetchDetails(media, id);
    }
    return Promise.resolve(null);
  }, [id]);

  const { fetchedData, isFetching, error } = useFetch<PersonDetails | null>(
    details
  );

  const defaultDateOfBirth = fetchedData?.birthday || null;
  const [year, month, day] = defaultDateOfBirth
    ? defaultDateOfBirth.split("-")
    : [];
  const formattedDateOfBirth = year ? `${day}.${month}.${year}` : null;

  const defaultDateOfDeath = fetchedData?.deathday || null;
  const [yearOfDeath, monthOfDeath, dayOfDeath] = defaultDateOfDeath
    ? defaultDateOfDeath.split("-")
    : [];
  const formattedDateOfDeath = yearOfDeath
    ? `${dayOfDeath}.${monthOfDeath}.${yearOfDeath}`
    : null;

  if (!open) {
    return null;
  }

  const statusMessage = (
    <DataStatus
      fetchedData={fetchedData}
      isFetching={isFetching}
      error={error}
      subject="Popular People"
    />
  );

  if (isFetching || error || !fetchedData) {
    return statusMessage;
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      disableRestoreFocus
      className="people-modal"
    >
      <DialogTitle className="people-modal-title-wrapper">
        <div className="people-modal-title">{fetchedData.name}</div>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        className="people-modal-close-button"
      >
        <CloseIcon className="people-modal-close-icon" />
      </IconButton>
      <DialogContent className="people-modal-content">
        <div className="people-modal-top">
          <img
            className="people-picture"
            loading="lazy"
            src={
              fetchedData.profile_path
                ? `https://image.tmdb.org/t/p/w500${fetchedData.profile_path}`
                : noPicture
            }
            alt={"Person Poster"}
          />
          <div className="people-data-display">
            <div className="people-data job">
              {fetchedData.known_for_department}
            </div>
            <div>
              Date of Birth:{" "}
              <span className="people-data">
                {formattedDateOfBirth || "No Data"}
              </span>
            </div>
            {formattedDateOfDeath && (
              <div>
                Date of Death:{" "}
                <span className="people-data">{formattedDateOfDeath}</span>
              </div>
            )}
            <div>
              Place of Birth:{" "}
              <span className="people-data">
                {fetchedData.place_of_birth || "No Data"}
              </span>
            </div>
          </div>
        </div>
        <div className="people-description">
          {fetchedData.biography || "No Data"}
        </div>
      </DialogContent>
    </Dialog>
  );
}
