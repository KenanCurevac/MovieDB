import { useState, useEffect } from "react";
import TrailerModal from "../UI/TrailerModal";
import "./TrailerPart.css";
import axios from "axios";

export default function TrailerPart({ title, releaseDate, movieToShow }) {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (!movieToShow) {
      return;
    }

    async function fetchTrailer() {
      const fetchedTrailer = await fetchTrailers(movieToShow);
      setTrailer(fetchedTrailer[0].key);
    }

    fetchTrailer();
  }, [movieToShow]);

  return (
    <div className="trailer-container">
      <TrailerModal open={open} onClose={handleClose} trailer={trailer} />

      <div className="watch-trailer">WATCH TRAILER</div>
      {trailer && (
        <div onClick={handleOpen} className="thumbnail-container">
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            frameBorder="0"
            className="thumbnail"
          ></iframe>
        </div>
      )}
      <div className="trailer-info">
        <div className="trailer-title">{title}</div>
        <div className="date">Release Date:</div>
        <div className="date">{releaseDate}</div>
      </div>
    </div>
  );
}

async function fetchTrailers(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
      },
    }
  );
  return response.data.results;
}
