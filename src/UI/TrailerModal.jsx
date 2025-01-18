import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./TrailerModal.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function TrailerModal({ open, onClose, trailer }) {
  return (
    <Dialog onClose={onClose} open={open} className="trailer-modal">
      <IconButton
        aria-label="close"
        onClick={onClose}
        className="trailer-close-button"
      >
        <CloseIcon className="trailer-close-icon" />
      </IconButton>
      <DialogContent>
        <iframe
          src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          className="playing-trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
