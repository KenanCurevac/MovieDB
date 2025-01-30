import "./TrailerLayout.css";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import transparent from "../assets/clearimage.png";
import Modal from "../UI/Modal";
import LayoutTitle from "./LayoutTitle";
import TrailerPart from "./TrailerPart";

export default function TrailerLayout({ data, title, link }) {
  const [offset, setOffset] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const movieToShow = data[offset]?.id || null;

  const initialDate = data[offset]?.release_date || null;
  const [year, month, day] = initialDate ? initialDate.split("-") : [];
  const releaseDate = year ? `${day}.${month}.${year}` : null;

  function handleSlide(action) {
    setOffset((prevOffset) =>
      action === "next" ? prevOffset + 1 : prevOffset - 1
    );
  }

  function handleOpenModal(id) {
    setOpenModal(true);
    setMovieId(id);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="trailer-layout-container">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        media="movie"
        id={movieId}
      />

      <div className="upcoming-movies-side-container">
        <LayoutTitle title={title} link={link} />
        <div className="trailer-carousel-container">
          <button
            onClick={() => handleSlide("previous")}
            className={`arrows ${offset === 0 ? "disabled-button" : ""}`}
            disabled={offset === 0}
          >
            <ArrowForwardIosIcon className="arrow-left" />
          </button>
          <div className="trailer-carousel">
            {[
              { id: "1", border: "none" },
              ...data,
              { id: "2", border: "none" },
            ].map((elem, index) => {
              let className = "";

              if (-1 + offset === index) {
                className = "previous-picture";
              } else if (offset === index) {
                className = "on-the-left";
              } else if (1 + offset === index) {
                className = "middle-picture";
              } else if (2 + offset === index) {
                className = "on-the-right";
              } else if (3 + offset === index) {
                className = "next-picture";
              } else return null;

              return (
                <div
                  key={elem.id}
                  className={`trailer-carousel-picture-container ${
                    className === "on-the-left" || className === "on-the-right"
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
                        : transparent
                    }
                    alt={elem.title}
                    className={`${className} trailer-carousel-picture`}
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
            className={`arrows ${offset === 19 ? "disabled-button" : ""}`}
            disabled={offset === 19}
          >
            <ArrowForwardIosIcon className="arrow-right" />
          </button>
        </div>
      </div>
      <TrailerPart
        title={data[offset]?.title || "No title"}
        releaseDate={releaseDate}
        movieToShow={movieToShow}
      />
    </div>
  );
}
