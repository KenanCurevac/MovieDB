import "./BigLayout.css";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "../UI/Modal";
import LayoutTitle from "./LayoutTitle";

export default function BigLayout({ data, title, link, media }) {
  const [slides, setSlides] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState(null);

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
    <div className="big-layout-container">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        media={media}
        id={modalId}
      />

      <div className="big-slide-container">
        <LayoutTitle title={title} link={link} />
        <div className="slide-group">
          <button
            onClick={() => handleSlide("previous")}
            className={`arrows ${slides === 0 ? "disabled-button" : ""}`}
            disabled={slides === 0}
          >
            <ArrowForwardIosIcon className="arrow-left" />
          </button>
          <div className="slide">
            {data.map((elem, index) => {
              let className = "";

              if (-1 + slides < index && index < 5 + slides) {
                className = `main-picture ${
                  0 + slides === index
                    ? "first-big-layout"
                    : 1 + slides === index
                    ? "second-big-layout"
                    : 2 + slides === index
                    ? "third-big-layout"
                    : 3 + slides === index
                    ? "fourth-big-layout"
                    : 4 + slides === index
                    ? "fifth-big-layout"
                    : ""
                }`;
              } else if (-1 + slides === index) {
                className = "previous-picture";
              } else if (5 + slides === index) {
                className = "next-picture";
              } else return null;

              return (
                <div
                  key={elem.id}
                  className="picture-container-big-layout"
                  onClick={() => handleOpenModal(elem.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      elem.poster_path || elem.profile_path
                    }`}
                    alt={elem.title || elem.name}
                    className={`${className} big-carousel-picture`}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => handleSlide("next")}
            className={`arrows ${slides === 15 ? "disabled-button" : ""}`}
            disabled={slides === 15}
          >
            <ArrowForwardIosIcon className="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
