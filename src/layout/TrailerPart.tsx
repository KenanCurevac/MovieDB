import "./TrailerPart.css";
import { useState, useEffect } from "react";
import { fetchTrailers } from "../http";
import TrailerModal from "../UI/TrailerModal";
import noVideo from "../assets/no-video.jpg";

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
      setTrailerKey(
        fetchedTrailer && fetchedTrailer.length > 0
          ? fetchedTrailer[0].key
          : null
      );
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
      <div
        onClick={handleOpenTrailer}
        className="trailer-thumbnail-container"
        style={{ pointerEvents: trailerKey ? "auto" : "none" }}
      >
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            className="trailer-thumbnail"
          ></iframe>
        ) : (
          <img
            src={noVideo}
            alt="Trailer not available"
            className="trailer-thumbnail"
            style={{ border: "none" }}
          />
        )}
      </div>
      <div className="trailer-info">
        <div className="trailer-title">{title}</div>
        <div className="trailer-release-date">Release Date:</div>
        <div className="trailer-release-date">{releaseDate}</div>
      </div>
    </div>
  );
}
