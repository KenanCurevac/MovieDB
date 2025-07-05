import "./DataStatus.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { MovieSimple } from "../models/movieSimple";
import { MovieDetails } from "../models/movieDetails";
import { ShowSimple } from "../models/showSimple";
import { ShowDetails } from "../models/showDetails";
import { PersonSimple } from "../models/personSimple";
import { PersonDetails } from "../models/personDetails";

type DataStatusProps = {
  fetchedData:
    | MovieSimple[]
    | MovieDetails
    | ShowSimple[]
    | ShowDetails
    | PersonSimple[]
    | PersonDetails
    | null;
  isFetching: boolean;
  error: Error | { message: string } | null;
  subject: string;
};

export default function DataStatus({
  fetchedData,
  isFetching,
  error,
  subject,
}: DataStatusProps) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (isFetching) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
        setShowMessage(true);
      }, 800);
    } else if (timeout !== null) {
      clearTimeout(timeout);
      setShowSpinner(false);
      setShowMessage(false);
    }

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [isFetching]);

  if (showSpinner) {
    return <CircularProgress className="loading-spinner" />;
  }

  if (showMessage && error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (
    showMessage &&
    (!fetchedData || (Array.isArray(fetchedData) && fetchedData.length === 0))
  ) {
    return <div className="error-message">No {subject} available.</div>;
  }

  return null;
}
