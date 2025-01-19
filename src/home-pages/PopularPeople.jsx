import { useCallback, useState } from "react";
import SimpleCard from "../UI/SimpleCard";
import { fetchPopularPeople } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import PeopleModal from "../UI/PeopleModal";

export default function PopularPeople() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [modalPersonId, setModalPersonId] = useState(null);

  const fetchMovies = useCallback(() => fetchPopularPeople(1), []);
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChange(event, value) {
    setPage(value);
  }

  function handleClickOpen(id) {
    setOpen(true);
    setModalPersonId(id);
  }

  function handleClose() {
    setOpen(false);
  }

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
      <PeopleModal
        open={open}
        onClose={handleClose}
        media="person"
        id={modalPersonId}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="list-title">Popular People</h1>
      </div>
      <div className="movie-list">
        {fetchedData.map((person) => (
          <SimpleCard
            key={person.id}
            data={person}
            onClick={() => handleClickOpen(person.id)}
          />
        ))}{" "}
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
