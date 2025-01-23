import SimpleCard from "../UI/SimpleCard";
import "./movies.css";
import useFetch from "../hooks/useFetch";
import { fetchTopRatedMovies } from "../http";
import { useCallback, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";
import DataStatus from "../tvseries-pages/DataStatus";
import { useSearchParams } from "react-router-dom";

export default function TopRatedMovies() {
  const [open, setOpen] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchMovies = useCallback(
    () => fetchTopRatedMovies(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChange(event, value) {
    setSearchParams({ page: value });
  }

  function handleClickOpen(id) {
    setOpen(true);
    setModalMovieId(id);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    setOpen(false);
  }, [currentPage]);

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

      <h1 className="list-title">Top Rated Movies</h1>
      <div className="movie-list">
        {fetchedData.map((movie, index) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={movie.id}
              data={movie}
              onClick={() => handleClickOpen(movie.id)}
              rank={rank}
            />
          );
        })}
      </div>
      <Pagination
        count={10}
        page={currentPage}
        onChange={handleChange}
        className="pagination"
      />
    </>
  );
}
