import "./DataStatus.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";

export default function DataStatus({
  fetchedData,
  isFetching,
  error,
  subject,
}) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeout;

    if (isFetching) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
        setShowMessage(true);
      }, 800);
    } else {
      clearTimeout(timeout);
      setShowSpinner(false);
      setShowMessage(false);
    }

    return () => clearTimeout(timeout);
  }, [isFetching]);

  if (showSpinner) {
    return <CircularProgress className="loading-spinner" />;
  }

  if (showMessage && error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (showMessage && (!fetchedData || fetchedData.length === 0)) {
    return <div className="error-message">No {subject} available.</div>;
  }

  return null;
}
