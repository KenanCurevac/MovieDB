import { useCallback, useState } from "react";
import SimpleCard from "../UI/SimpleCard";
import { fetchPopularPeople } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";

export default function PopularPeople() {
  const [page, setPage] = useState(1);

  const fetchMovies = useCallback(() => fetchPopularPeople(1), []);
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  function handleChange(event, value) {
    setPage(value);
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="list-title">Popular People</h1>
      </div>
      <div className="movie-list">
        {fetchedData.map((person) => (
          <SimpleCard key={person.id} data={person} />
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
