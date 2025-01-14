import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import "./Search.css";
import { fetchSearch } from "../http";

export default function Asynchronous() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetchData = async (query) => {
    setLoading(true);
    const response = await fetchSearch(query);
    setLoading(false);

    setOptions([...response]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInputChange(e, newInputValue) {
    setInputValue(newInputValue);
    fetchData(newInputValue);
  }

  return (
    <Autocomplete
      className="search"
      open={open && inputValue.length > 0}
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
          <Box key={myKey} component="li" {...optionProps}>
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${
                option.poster_path || option.profile_path
              }`}
              alt="image"
              className="search-picture"
            />
            <div className="search-info">
              <div>{option.title || option.name}</div>
              <div>({releaseYear})</div>
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
  );
}
