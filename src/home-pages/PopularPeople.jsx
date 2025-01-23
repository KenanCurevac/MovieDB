import { useCallback, useEffect, useState } from "react";
import SimpleCard from "../UI/SimpleCard";
import { fetchPopularPeople } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import PeopleModal from "../UI/PeopleModal";
import DataStatus from "../tvseries-pages/DataStatus";
import { useSearchParams } from "react-router-dom";

export default function PopularPeople() {
  const [open, setOpen] = useState(false);
  const [modalPersonId, setModalPersonId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchMovies = useCallback(
    () => fetchPopularPeople(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChange(event, value) {
    setSearchParams({ page: value });
  }

  function handleClickOpen(id) {
    setOpen(true);
    setModalPersonId(id);
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
      subject="Popular People"
    />
  );

  if (isFetching || error || !fetchedData || fetchedData.length === 0) {
    return statusMessage;
  }

  return (
    <>
      <PeopleModal
        open={open}
        onClose={handleClose}
        media="person"
        id={modalPersonId}
      />

      <h1 className="list-title">Popular People</h1>
      <div className="movie-list">
        {fetchedData.map((person, index) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={person.id}
              data={person}
              onClick={() => handleClickOpen(person.id)}
              rank={rank}
            />
          );
        })}{" "}
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
