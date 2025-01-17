import "./BigLayout.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function BigLayout({ data, title, link }) {
  const [slides, setSlides] = useState(0);

  function handleSlide(action) {
    setSlides((prevSlide) =>
      action === "next" ? prevSlide + 1 : prevSlide - 1
    );
  }

  return (
    <div className="slide-container">
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
        <div className="slide">
          {data.map((elem, index) => {
            let className = "";

            if (-1 + slides < index && index < 5 + slides) {
              className = "main-picture";
            } else if (-1 + slides === index) {
              className = "previous-picture";
            } else if (5 + slides === index) {
              className = "next-picture";
            } else return null;

            return (
              <div key={elem.id} className="picture-container">
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
  );
}
