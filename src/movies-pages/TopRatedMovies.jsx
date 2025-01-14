import SimpleCard from "../UI/SimpleCard";
import "./movies.css";
import useFetch from "../hooks/useFetch";
import { fetchTopRatedMovies } from "../http";
import { useCallback, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";

export default function TopRatedMovies() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(null);

  const fetchMovies = useCallback(() => fetchTopRatedMovies(page), [page]);
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChange(event, value) {
    setPage(value);
  }

  const handleClickOpen = (movie) => {
    setOpen(true);
    setModalMovieId(movie.id);
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
      <Modal
        open={open}
        onClose={handleClose}
        media="movie"
        id={modalMovieId}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="list-title">Top Rated Movies</h1>
      </div>
      <div className="movie-list">
        {fetchedData.map((movie) => (
          <SimpleCard
            key={movie.id}
            data={movie}
            onClick={() => handleClickOpen(movie)}
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
