import "./Subpage.css";
import { useCallback, useEffect, useState } from "react";
import SimpleCard from "../UI/SimpleCard";
import { fetchPopularPeople } from "../http";
import useFetch from "../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import PeopleModal from "../UI/PeopleModal";
import DataStatus from "./DataStatus";
import { useSearchParams } from "react-router-dom";
import { PersonSimple } from "../models/personSimple";
import { useMediaQuery } from "@mui/material";

export default function PopularPeople() {
  const [openModal, setOpenModal] = useState(false);
  const [personId, setPersonId] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchMovies = useCallback(
    () => fetchPopularPeople(currentPage),
    [currentPage]
  );
  const { fetchedData, isFetching, error } = useFetch(fetchMovies);

  const isSmallScreen = useMediaQuery("(max-width:670px)");

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setSearchParams({ page: value.toString() });
  }

  function handleOpenModal(id: number) {
    setOpenModal(true);
    setPersonId(id);
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
      subject="Popular People"
    />
  );

  if (isFetching || error || !fetchedData || fetchedData.length === 0) {
    return statusMessage;
  }

  return (
    <>
      {personId && (
        <PeopleModal
          open={openModal}
          onClose={handleCloseModal}
          media="person"
          id={personId}
        />
      )}

      <h1 className="list-title">Popular People</h1>
      <div className="content-list">
        {fetchedData.map((person: PersonSimple, index: number) => {
          const rank = 20 * (currentPage - 1) + index + 1;

          return (
            <SimpleCard
              key={person.id}
              data={person}
              onOpenModal={handleOpenModal}
              rank={rank}
            />
          );
        })}{" "}
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
