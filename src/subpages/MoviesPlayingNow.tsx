import "./Subpage.scss";
import { useCallback, useEffect, useState } from "react";
import SimpleCard from "../UI/SimpleCard";
import { fetchMoviesPlayingNow } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";
import DataStatus from "./DataStatus";
import { useSearchParams } from "react-router-dom";
import { MovieSimple } from "../models/movieSimple";
import { useMediaQuery } from "@mui/material";

export default function MoviesPlayingNow() {
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchMovies = useCallback(
    () => fetchMoviesPlayingNow(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  const isSmallScreen = useMediaQuery("(max-width:670px)");

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setSearchParams({ page: value.toString() });
  }

  function handleOpenModal(id: number) {
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
      {movieId && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          media="movie"
          id={movieId}
        />
      )}

      <h1 className="list-title">Movies Playing Now</h1>
      <div className="content-list">
        {fetchedData.map((movie: MovieSimple, index: number) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={movie.id}
              data={movie}
              onOpenModal={handleOpenModal}
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
        siblingCount={isSmallScreen ? 0 : 1}
      />
    </>
  );
}
