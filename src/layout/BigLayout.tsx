import "./BigLayout.css";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "../UI/Modal";
import LayoutTitle from "./LayoutTitle";
import { MovieSimple } from "../models/movieSimple";
import { ShowSimple } from "../models/showSimple";
import noPicture from "../assets/placeholder.jpg";

type BigLayoutProps = {
  data: MovieSimple[] | ShowSimple[];
  title: string;
  link: string;
  media: string;
};

export default function BigLayout({
  data,
  title,
  link,
  media,
}: BigLayoutProps) {
  const [offset, setOffset] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);

  function handleSlide(action: string) {
    setOffset((prevOffset) =>
      action === "next" ? prevOffset + 1 : prevOffset - 1
    );
  }

  function handleOpenModal(id: number) {
    setOpenModal(true);
    setMovieId(id);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="big-layout-container">
      {movieId && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          media={media}
          id={movieId}
        />
      )}

      <LayoutTitle title={title} link={link} />
      <div className="big-carousel-container">
        <button
          onClick={() => handleSlide("previous")}
          className={`arrows-big-layout ${
            offset === 0 ? "disabled-button" : ""
          }`}
          disabled={offset === 0}
        >
          <ArrowForwardIosIcon className="arrow-left" />
        </button>
        <div className="big-carousel">
          {data.map((elem, index) => {
            let className = "";

            if (-1 + offset < index && index < 5 + offset) {
              className = `main-picture ${
                0 + offset === index
                  ? "first-big-carousel-picture"
                  : 1 + offset === index
                  ? "second-big-carousel-picture"
                  : 2 + offset === index
                  ? "third-big-carousel-picture"
                  : 3 + offset === index
                  ? "fourth-big-carousel-picture"
                  : 4 + offset === index
                  ? "fifth-big-carousel-picture"
                  : ""
              }`;
            } else if (-1 + offset === index) {
              className = "front-picture";
            } else if (5 + offset === index) {
              className = "back-picture";
            } else return null;

            const isMovie = elem && "release_date" in elem;
            const isShow = elem && "first_air_date" in elem;

            return (
              <div
                key={elem.id}
                className="big-carousel-picture-container"
                onClick={() => handleOpenModal(elem.id)}
              >
                <img
                  src={
                    elem.poster_path
                      ? `https://image.tmdb.org/t/p/w500${elem.poster_path}`
                      : noPicture
                  }
                  alt={
                    isMovie
                      ? "Movie Poster"
                      : isShow
                      ? "TV Series Poster"
                      : "Media Picture"
                  }
                  className={`${className} big-carousel-picture`}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => handleSlide("next")}
          className={`arrows-big-layout ${
            offset === 15 ? "disabled-button" : ""
          }`}
          disabled={offset === 15}
        >
          <ArrowForwardIosIcon className="arrow-right" />
        </button>
      </div>
    </div>
  );
}
