import SimpleCard from "../UI/SimpleCard";
import { useCallback, useState } from "react";
import { fetchUpcomingMovies } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";
import DataStatus from "../tvseries-pages/DataStatus";

export default function UpcomingMovies() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(null);

  const fetchMovies = useCallback(() => fetchUpcomingMovies(1), []);
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChange(event, value) {
    setPage(value);
  }

  function handleClickOpen(id) {
    setOpen(true);
    setModalMovieId(id);
  }

  function handleClose() {
    setOpen(false);
  }

  const statusMessage = (
    <DataStatus
      fetchedData={fetchedData}
      isFetching={isFetching}
      error={error}
      subject="Movies"
    />
  );

  if (isFetching || error || !fetchedData || fetchedData.length === 0) {
    return statusMessage;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        media="movie"
        id={modalMovieId}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="list-title">Upcoming Movies</h1>
      </div>
      <div className="movie-list">
        {fetchedData.map((movie) => (
          <SimpleCard
            key={movie.id}
            data={movie}
            onClick={() => handleClickOpen(movie.id)}
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
