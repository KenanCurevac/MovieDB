import "./Search.scss";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { fetchSearch } from "../http";
import noPicture from "../assets/placeholder.jpg";
import Modal from "./Modal";
import PeopleModal from "./PeopleModal";
import { MovieSearchData } from "../models/movieSearch";
import { ShowSearchData } from "../models/showSearch";
import { PersonSearchData } from "../models/personSearch";

type SearchOption = MovieSearchData | ShowSearchData | PersonSearchData;

export default function Search() {
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [results, setResults] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState<number | null>(null);
  const [media, setMedia] = useState("");

  const fetchData = async (query: string) => {
    setLoading(true);
    const response = await fetchSearch(query);
    setLoading(false);

    setResults([...response]);
  };

  function handleOpenSearchResults() {
    setSearchResultsOpen(true);
  }

  function handleCloseSearchResults() {
    setSearchResultsOpen(false);
  }

  function handleInputChange(
    e: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) {
    fetchData(newInputValue);
  }

  function handleOpenModal(id: number, media: string) {
    setOpenModal(true);
    setModalId(id);
    setMedia(media);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      {modalId !== null &&
        (media !== "person" ? (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            media={media}
            id={modalId}
          />
        ) : (
          <PeopleModal
            open={openModal}
            onClose={handleCloseModal}
            media="person"
            id={modalId}
          />
        ))}

      <Autocomplete
        className="search"
        open={searchResultsOpen}
        onOpen={handleOpenSearchResults}
        onClose={handleCloseSearchResults}
        onInputChange={handleInputChange}
        clearOnBlur={false}
        getOptionLabel={(result) => {
          if (typeof result !== "string") {
            const isMovie = "release_date" in result;
            const isShow = "first_air_date" in result;
            const isPerson = "known_for_department" in result;

            if (isMovie) {
              return result.title;
            } else if (isShow || isPerson) {
              return result.name;
            }
          }
          return "";
        }}
        options={results}
        loading={loading}
        disableClearable
        freeSolo
        slotProps={{
          popper: {
            id: "search-results-popper",
            sx: {
              borderWidth: results.length > 0 ? "3px !important" : "0px",
            },
          },
        }}
        renderOption={(props, result, index) => {
          const { key, ...resultProps } = props;
          const myKey = `${result.id}-${index}`;

          const isMovie = "release_date" in result;
          const isShow = "first_air_date" in result;
          const isPerson = "known_for_department" in result;

          const releaseYear = isMovie
            ? result.release_date.split("-")[0]
            : isShow
            ? result.first_air_date.split("-")[0]
            : null;

          let imageSrc = noPicture;

          if (isMovie || isShow) {
            if (result.poster_path) {
              imageSrc = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
            }
          } else if (isPerson) {
            if (result.profile_path) {
              imageSrc = `https://image.tmdb.org/t/p/w500${result.profile_path}`;
            }
          }

          return (
            <Box
              key={myKey}
              component="li"
              {...resultProps}
              onClick={() => handleOpenModal(result.id, result.media_type)}
            >
              <img
                loading="lazy"
                src={imageSrc}
                alt={
                  isMovie
                    ? "Movie Poster"
                    : isShow
                    ? "TV Series Poster"
                    : isPerson
                    ? "Person Poster"
                    : "Media Picture"
                }
                className="search-picture"
              />
              <div className="search-info">
                <div>
                  {isMovie
                    ? result.title
                    : isShow || isPerson
                    ? result.name
                    : "No Title"}
                </div>
                <div>
                  {releaseYear ? "(" : ""}
                  {isMovie || isShow
                    ? releaseYear
                    : isPerson
                    ? result.known_for_department
                    : null}
                  {releaseYear ? ")" : ""}
                </div>
              </div>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Film Atlas"
            InputLabelProps={{ shrink: false }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#e6b5bb" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
