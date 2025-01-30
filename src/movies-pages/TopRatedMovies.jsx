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
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchMovies = useCallback(
    () => fetchTopRatedMovies(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChangePage(event, value) {
    setSearchParams({ page: value });
  }

  function handleOpenModal(id) {
    setOpenModal(true);
    setMovieId(id);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  useEffect(() => {
    setOpenModal(false);
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
        open={openModal}
        onClose={handleCloseModal}
        media="movie"
        id={movieId}
      />

      <h1 className="list-title">Top Rated Movies</h1>
      <div className="content-list">
        {fetchedData.map((movie, index) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={movie.id}
              data={movie}
              onClick={() => handleOpenModal(movie.id)}
              rank={rank}
            />
          );
        })}
      </div>
      <Pagination
        count={10}
        page={currentPage}
        onChange={handleChangePage}
        className="pagination"
      />
    </>
  );
}
