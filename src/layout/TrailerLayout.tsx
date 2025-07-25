import "./TrailerLayout.scss";
import { useState } from "react";
import transparent from "../assets/clearimage.png";
import Modal from "../UI/Modal";
import LayoutTitle from "./LayoutTitle";
import TrailerPart from "./TrailerPart";
import { MovieSimple } from "../models/movieSimple";
import noPicture from "../assets/placeholder.jpg";
import Arrows from "./Arrows";

type TrailerLayoutProps = {
  data: MovieSimple[];
  title: string;
  link: string;
};

export default function TrailerLayout({
  data,
  title,
  link,
}: TrailerLayoutProps) {
  const [offset, setOffset] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);

  const movieToShow = data[offset]?.id || null;

  const initialDate = data[offset]?.release_date || null;
  const [year, month, day] = initialDate ? initialDate.split("-") : [];
  const releaseDate = year ? `${day}.${month}.${year}` : null;

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
    <div className="trailer-layout">
      {movieId && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          media="movie"
          id={movieId}
        />
      )}

      <div className="upcoming-movies-side-container">
        <LayoutTitle title={title} link={link} />
        <div className="trailer-carousel-container">
          <Arrows onHandleSlide={handleSlide} offset={offset} maxOffset={19}>
            <div className="trailer-carousel">
              {[
                { id: 1, border: "none" },
                ...data,
                { id: 2, border: "none" },
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

                const isMovie = elem && "release_date" in elem;

                return (
                  <div
                    key={elem.id}
                    className={`${
                      className === "on-the-left" ||
                      className === "on-the-right"
                        ? "perspective"
                        : ""
                    } `}
                  >
                    <img
                      onClick={
                        className === "middle-picture"
                          ? () => handleOpenModal(elem.id)
                          : undefined
                      }
                      src={
                        isMovie
                          ? elem.poster_path
                            ? `https://image.tmdb.org/t/p/w500${elem.poster_path}`
                            : noPicture
                          : transparent
                      }
                      alt={isMovie ? "Movie Poster" : "Media Poster"}
                      className={`${className} trailer-carousel-picture`}
                      style={{
                        boxShadow: "border" in elem ? "none" : "5px 12px 5px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Arrows>
        </div>
      </div>
      {releaseDate && movieToShow && (
        <TrailerPart
          title={data[offset]?.title || "No title"}
          releaseDate={releaseDate}
          movieToShow={movieToShow}
        />
      )}
    </div>
  );
}
