import styles from "./BigLayout.module.css";
import { useState } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";

export default function BigLayout({ data, title, link }) {
  const [slides, setSlides] = useState(0);

  function handleSlide(action) {
    setSlides((prevSlide) =>
      action === "next" ? prevSlide + 1 : prevSlide - 1
    );
  }

  return (
    <div className={styles.slideContainer}>
      <Link
        to={link}
        className={styles.titleContainer}
        style={{ textDecoration: "none" }}
      >
        <div className={styles.line} />
        <div className={styles.title}>{title}</div>
        <i className={styles.arrowRight}></i>
      </Link>
      <div className={styles.slideGroup}>
        <button
          onClick={() => handleSlide("previous")}
          className={styles.arrows}
        >
          <DoubleArrowIcon
            sx={{
              transform: "rotate(180deg)",
              fontSize: 70,
              "& path": {
                fill: "#470d1d",
              },
              "&:hover path": {
                fill: "#177f62",
              },
            }}
          />
        </button>
        <div className={styles.slide}>
          {data.map((elem, index) => {
            let className = "";

            if (-1 + slides < index && index < 5 + slides) {
              className = "mainPicture";
            } else if (-1 + slides === index) {
              className = "previousPicture";
            } else if (5 + slides === index) {
              className = "nextPicture";
            } else return null;

            return (
              <div key={elem.id} className={styles.pictureContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    elem.poster_path || elem.profile_path
                  }`}
                  alt={elem.title || elem.name}
                  className={styles[className]}
                />
              </div>
            );
          })}
        </div>
        <button onClick={() => handleSlide("next")} className={styles.arrows}>
          <DoubleArrowIcon
            sx={{
              fontSize: 70,
              "& path": {
                fill: "#470d1d",
              },
              "&:hover path": {
                fill: "#177f62",
              },
            }}
          />
        </button>
      </div>
    </div>
  );
}
