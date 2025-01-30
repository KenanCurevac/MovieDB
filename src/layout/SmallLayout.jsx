import "./SmallLayout.css";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "../UI/Modal";
import PeopleModal from "../UI/PeopleModal";
import LayoutTitle from "./LayoutTitle";

export default function SmallLayout({ data, title, link, media }) {
  const [offset, setOffset] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState(null);

  function handleOffset(action) {
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
    <div className="small-layout-container">
      {media !== "person" ? (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          media={media}
          id={movieId}
        />
      ) : (
        <PeopleModal
          open={openModal}
          onClose={handleCloseModal}
          media={media}
          id={movieId}
        />
      )}

      <LayoutTitle title={title} link={link} />
      <div className="small-carousel-container">
        <button
          onClick={() => handleOffset("previous")}
          className={`arrows ${offset === 0 ? "disabled-button" : ""}`}
          disabled={offset === 0}
        >
          <ArrowForwardIosIcon className="arrow-left" />
        </button>
        <div className="small-carousel">
          {data.map((elem, index) => {
            let className = "";

            if (index === offset - 1) {
              className = "null-picture";
            } else if (index === 0 + offset) {
              className = "first-picture";
            } else if (index === 1 + offset) {
              className = "second-picture";
            } else if (index === 2 + offset) {
              className = "third-picture";
            } else if (index === 3 + offset) {
              className = "fourth-picture";
            } else return null;

            return (
              <div
                key={elem.id}
                className="small-carousel-picture-container"
                onClick={
                  className === "first-picture"
                    ? () => handleOpenModal(elem.id)
                    : null
                }
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    elem.poster_path || elem.profile_path
                  }`}
                  alt={elem.title || elem.name}
                  className={`${className} small-carousel-picture`}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => handleOffset("next")}
          className={`arrows ${offset === 17 ? "disabled-button" : ""}`}
          disabled={offset === 17}
        >
          <ArrowForwardIosIcon className="arrow-right" />
        </button>
      </div>
    </div>
  );
}
