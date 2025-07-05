import "./TrailerModal.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type TrailerModalProp = {
  open: boolean;
  onClose: () => void;
  trailerKey: string;
};

export default function TrailerModal({
  open,
  onClose,
  trailerKey,
}: TrailerModalProp) {
  return (
    <Dialog onClose={onClose} open={open} className="trailer-modal">
      <IconButton
        aria-label="close"
        onClick={onClose}
        className="trailer-close-button"
      >
        <CloseIcon className="trailer-close-icon" />
      </IconButton>
      <DialogContent className="trailer-modal-content">
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
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
