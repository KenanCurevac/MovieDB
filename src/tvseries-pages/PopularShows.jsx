import SimpleCard from "../UI/SimpleCard";
import { useCallback, useState } from "react";
import { fetchPopularShows } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";
import DataStatus from "./DataStatus";
import { useSearchParams } from "react-router-dom";

export default function PopularShows() {
  const [open, setOpen] = useState(false);
  const [modalShowId, setModalShowId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchShows = useCallback(
    () => fetchPopularShows(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchShows);

  function handleChange(event, value) {
    setSearchParams({ page: value });
  }

  function handleClickOpen(id) {
    setOpen(true);
    setModalShowId(id);
  }

  function handleClose() {
    setOpen(false);
  }

  const statusMessage = (
    <DataStatus
      fetchedData={fetchedData}
      isFetching={isFetching}
      error={error}
      subject="TV Shows"
    />
  );

  if (isFetching || error || !fetchedData || fetchedData.length === 0) {
    return statusMessage;
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} media="tv" id={modalShowId} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="list-title">Most Popular TV Shows</h1>
      </div>
      <div className="movie-list">
        {fetchedData.map((show, index) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={show.id}
              data={show}
              onClick={() => handleClickOpen(show.id)}
              rank={rank}
            />
          );
        })}
      </div>
      <Pagination
        count={10}
        page={currentPage}
        onChange={handleChange}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </>
  );
}
