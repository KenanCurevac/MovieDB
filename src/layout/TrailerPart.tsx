import "./TrailerPart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TrailerModal from "../UI/TrailerModal";

type TrailerPartProps = {
  title: string;
  releaseDate: string;
  movieToShow: number;
};

export default function TrailerPart({
  title,
  releaseDate,
  movieToShow,
}: TrailerPartProps) {
  const [openingTrailer, setOpeningTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  function handleOpenTrailer() {
    setOpeningTrailer(true);
  }

  function handleCloseTrailer() {
    setOpeningTrailer(false);
  }

  useEffect(() => {
    if (!movieToShow) {
      return;
    }

    async function fetchTrailer() {
      const fetchedTrailer = await fetchTrailers(movieToShow);
      setTrailerKey(fetchedTrailer[0].key);
    }

    fetchTrailer();
  }, [movieToShow]);

  return (
    <div className="trailer-side-container">
      {trailerKey && (
        <TrailerModal
          open={openingTrailer}
          onClose={handleCloseTrailer}
          trailerKey={trailerKey}
        />
      )}

      <div className="watch-trailer">WATCH TRAILER</div>
      {trailerKey && (
        <div
          onClick={handleOpenTrailer}
          className="trailer-thumbnail-container"
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            className="trailer-thumbnail"
          ></iframe>
        </div>
      )}
      <div className="trailer-info">
        <div className="trailer-title">{title}</div>
        <div className="trailer-release-date">Release Date:</div>
        <div className="trailer-release-date">{releaseDate}</div>
      </div>
    </div>
  );
}

async function fetchTrailers(movieId: number) {
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
