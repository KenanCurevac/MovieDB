import "./Search.css";
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
  const [openResults, setOpenResults] = useState(false);
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState<number | null>(null);
  const [media, setMedia] = useState("");

  const fetchData = async (query: string) => {
    setLoading(true);
    const response = await fetchSearch(query);
    setLoading(false);

    setOptions([...response]);
  };

  function handleOpenResults() {
    setOpenResults(true);
  }

  function handleCloseResults() {
    setOpenResults(false);
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
        open={openResults}
        onOpen={handleOpenResults}
        onClose={handleCloseResults}
        onInputChange={handleInputChange}
        clearOnBlur={false}
        getOptionLabel={(option) => {
          if (typeof option !== "string") {
            const isMovie = "release_date" in option;
            const isShow = "first_air_date" in option;
            const isPerson = "known_for_department" in option;

            if (isMovie) {
              return option.title;
            } else if (isShow || isPerson) {
              return option.name;
            }
          }
          return "";
        }}
        options={options}
        loading={loading}
        disableClearable
        freeSolo
        renderOption={(props, option, index) => {
          const { key, ...optionProps } = props;
          const myKey = `${option.id}-${index}`;

          const isMovie = "release_date" in option;
          const isShow = "first_air_date" in option;
          const isPerson = "known_for_department" in option;

          const releaseYear = isMovie
            ? option.release_date.split("-")[0]
            : isShow
            ? option.first_air_date.split("-")[0]
            : null;

          let imageSrc = noPicture;

          if (isMovie || isShow) {
            if (option.poster_path) {
              imageSrc = `https://image.tmdb.org/t/p/w500${option.poster_path}`;
            }
          } else if (isPerson) {
            if (option.profile_path) {
              imageSrc = `https://image.tmdb.org/t/p/w500${option.profile_path}`;
            }
          }

          return (
            <Box
              key={myKey}
              component="li"
              {...optionProps}
              onClick={() => handleOpenModal(option.id, option.media_type)}
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
                    ? option.title
                    : isShow || isPerson
                    ? option.name
                    : "No Title"}
                </div>
                <div>
                  {releaseYear ? "(" : ""}
                  {isMovie || isShow
                    ? releaseYear
                    : isPerson
                    ? option.known_for_department
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
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#e6b5bb" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </>
  );
}
