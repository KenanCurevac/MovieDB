import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import "./Search.css";
import { fetchSearch } from "../http";
import noPicture from "../assets/placeholder.jpg";
import Modal from "./Modal";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [media, setMedia] = useState("");

  const fetchData = async (query) => {
    setLoading(true);
    const response = await fetchSearch(query);
    setLoading(false);

    setOptions([...response]);
  };

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleInputChange(e, newInputValue) {
    fetchData(newInputValue);
  }

  function handleOpenModal(id, media) {
    setOpenModal(true);
    setModalId(id);
    setMedia(media);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        media={media}
        id={modalId}
      />

      <Autocomplete
        className="search"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onInputChange={handleInputChange}
        clearOnBlur={false}
        getOptionLabel={(option) => option.title || option.name}
        options={options}
        loading={loading}
        disableClearable
        freeSolo
        renderOption={(props, option, index) => {
          const { key, ...optionProps } = props;
          const myKey = `${option.id}-${index}`;
          const releaseYear = option.release_date
            ? option.release_date.split("-")[0]
            : option.first_air_date
            ? option.first_air_date.split("-")[0]
            : null;

          return (
            <Box
              key={myKey}
              component="li"
              {...optionProps}
              onClick={() => handleOpenModal(option.id, option.media_type)}
            >
              <img
                loading="lazy"
                src={
                  option.poster_path
                    ? `https://image.tmdb.org/t/p/w500${option.poster_path}`
                    : option.profile_path
                    ? `https://image.tmdb.org/t/p/w500${option.profile_path}`
                    : noPicture
                }
                alt="image"
                className="search-picture"
              />
              <div className="search-info">
                <div>{option.title || option.name}</div>
                <div>
                  {releaseYear ? "(" : ""}
                  {releaseYear || option.known_for_department}
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
