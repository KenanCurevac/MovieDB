import "./TrailerLayout.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import transparent from "../assets/clearimage.png";
import Modal from "../UI/Modal";

export default function TrailerLayout({ data, title, link, onPlayTrailer }) {
  const [slides, setSlides] = useState(0);
  const [trailer, setTrailer] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState(null);

  const movieToShow = data[slides]?.id || null;

  const initialDate = data[slides]?.release_date || null;
  const [year, month, day] = initialDate ? initialDate.split("-") : [];
  const releaseDate = year ? `${day}.${month}.${year}` : null;

  useEffect(() => {
    if (!movieToShow) {
      return;
    }

    async function fetchTrailer() {
      try {
        const fetchedTrailer = await fetchTrailers(movieToShow);
        setTrailer(fetchedTrailer[0].key);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    }

    fetchTrailer();
  }, [movieToShow]);

  function handleSlide(action) {
    setSlides((prevSlide) =>
      action === "next" ? prevSlide + 1 : prevSlide - 1
    );
  }

  function handleOpenModal(id) {
    setOpenModal(true);
    setModalId(id);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        media="movie"
        id={modalId}
      />

      <div className="section-container">
        <div className="slide-trailer-container">
          <Link
            to={link}
            className="title-container"
            style={{ textDecoration: "none" }}
          >
            <div className="line" />
            <div className="title">{title}</div>
            <i className="rotating-arrow"></i>
          </Link>
          <div className="slide-group">
            <button
              onClick={() => handleSlide("previous")}
              className={`arrows ${slides === 0 ? "disabled-button" : ""}`}
              disabled={slides === 0}
            >
              <ArrowForwardIosIcon className="arrow-left" />
            </button>
            <div className="poster-slide">
              {[
                { id: "1", border: "none" },
                ...data,
                { id: "2", border: "none" },
                { id: "3", border: "none" },
              ].map((elem, index) => {
                let className = "";

                if (-1 + slides === index) {
                  className = "previous-picture";
                } else if (0 + slides === index) {
                  className = "on-the-left";
                } else if (1 + slides === index) {
                  className = "middle-picture";
                } else if (2 + slides === index) {
                  className = "on-the-right";
                } else if (3 + slides === index) {
                  className = "next-picture";
                } else return null;

                return (
                  <div
                    key={elem.id}
                    className={`picture-container-trailer ${
                      className === "on-the-left" ||
                      className === "on-the-right"
                        ? "perspective"
                        : ""
                    } `}
                    onClick={
                      className === "middle-picture"
                        ? () => handleOpenModal(elem.id)
                        : null
                    }
                  >
                    <img
                      src={
                        elem.poster_path
                          ? `https://image.tmdb.org/t/p/w500${elem.poster_path}`
                          : elem.profile_path
                          ? `https://image.tmdb.org/t/p/w500${elem.profile_path}`
                          : transparent
                      }
                      alt={elem.title || elem.name || "placeholder image"}
                      className={`${className} trailer-carousel-image`}
                      style={{
                        boxShadow:
                          elem.border === "none" ? "none" : "5px 12px 5px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => handleSlide("next")}
              className={`arrows ${slides === 19 ? "disabled-button" : ""}`}
              disabled={slides === 19}
            >
              <ArrowForwardIosIcon className="arrow-right" />
            </button>
          </div>
        </div>
        <div className="trailer-container">
          <div className="watch-trailer">WATCH TRAILER</div>
          {trailer && (
            <div
              onClick={() => onPlayTrailer(trailer)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                title="YouTube video player"
                frameBorder="0"
                className="thumbnail"
              ></iframe>
            </div>
          )}
          <div className="trailer-info">
            <div className="trailer-title">{data[slides]?.title || ""}</div>
            <div className="date">Release Date:</div>
            <div className="date">{releaseDate}</div>
          </div>
        </div>
      </div>
    </>
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
