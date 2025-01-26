import "./TrailerLayout.css";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import transparent from "../assets/clearimage.png";
import Modal from "../UI/Modal";
import LayoutTitle from "./LayoutTitle";
import TrailerPart from "./TrailerPart";

export default function TrailerLayout({ data, title, link }) {
  const [slides, setSlides] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState(null);

  const movieToShow = data[slides]?.id || null;

  const initialDate = data[slides]?.release_date || null;
  const [year, month, day] = initialDate ? initialDate.split("-") : [];
  const releaseDate = year ? `${day}.${month}.${year}` : null;

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
    <div className="upcoming-movies-trailer-container">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        media="movie"
        id={modalId}
      />

      <div className="section-container">
        <div className="slide-trailer-container">
          <LayoutTitle title={title} link={link} />
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
        <TrailerPart
          title={data[slides]?.title || ""}
          releaseDate={releaseDate}
          movieToShow={movieToShow}
        />
      </div>
    </div>
  );
}
