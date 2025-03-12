import "./Subpage.css";
import SimpleCard from "../UI/SimpleCard";
import { useCallback, useEffect, useState } from "react";
import { fetchPopularShows } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Modal from "../UI/Modal";
import DataStatus from "./DataStatus";
import { useSearchParams } from "react-router-dom";
import { ShowSimple } from "../models/showSimple";
import { useMediaQuery } from "@mui/material";

export default function PopularShows() {
  const [openModal, setOpenModal] = useState(false);
  const [showId, setShowId] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchShows = useCallback(
    () => fetchPopularShows(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchShows);

  const isSmallScreen = useMediaQuery("(max-width:670px)");

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setSearchParams({ page: value.toString() });
  }

  function handleOpenModal(id: number) {
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
      {showId && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          media="tv"
          id={showId}
        />
      )}

      <h1 className="list-title">Most Popular TV Series</h1>
      <div className="content-list">
        {fetchedData.map((show: ShowSimple, index: number) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={show.id}
              data={show}
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
