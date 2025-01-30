import "./Subpage.css";
import SimpleCard from "../UI/SimpleCard";
import { useCallback, useEffect, useState } from "react";
import { fetchPopularShows } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";
import DataStatus from "./DataStatus";
import { useSearchParams } from "react-router-dom";

export default function PopularShows() {
  const [openModal, setOpenModal] = useState(false);
  const [showId, setShowId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchShows = useCallback(
    () => fetchPopularShows(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchShows);

  function handleChangePage(event, value) {
    setSearchParams({ page: value });
  }

  function handleOpenModal(id) {
    setOpenModal(true);
    setShowId(id);
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
      subject="TV Shows"
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
        media="tv"
        id={showId}
      />

      <h1 className="list-title">Most Popular TV Series</h1>
      <div className="content-list">
        {fetchedData.map((show, index) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={show.id}
              data={show}
              onClick={() => handleOpenModal(show.id)}
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
