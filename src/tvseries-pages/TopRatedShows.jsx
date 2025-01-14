import { useCallback, useState } from "react";
import SimpleCard from "../UI/SimpleCard";
import { fetchTopRatedShows } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";

export default function TopRatedShows() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [modalShowId, setModalShowId] = useState(null);

  const fetchShows = useCallback(() => fetchTopRatedShows(1), []);
  const { fetchedData, isFetching, error } = useFetch(fetchShows);

  function handleChange(event, value) {
    setPage(value);
  }

  const handleClickOpen = (show) => {
    setOpen(true);
    setModalShowId(show.id);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  if (isFetching) {
    return <div className="loading-message">Loading questions...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!fetchedData || fetchedData.length === 0) {
    return <div className="no-questions-message">No questions available.</div>;
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} media="tv" id={modalShowId} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="list-title">Top Rated TV Shows</h1>
      </div>
      <div className="movie-list">
        {fetchedData.map((show) => (
          <SimpleCard
            key={show.id}
            data={show}
            onClick={() => handleClickOpen(show)}
          />
        ))}
      </div>
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </>
  );
}
