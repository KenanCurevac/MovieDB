import styles from "./SmallLayout.module.css";
import { useState } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";

export default function SmallLayout({ data, title, link }) {
  const [slides, setSlides] = useState(0);
  const [transitionNext, setTransitionNext] = useState(false);
  const [transitionPrevious, setTransitionPrevious] = useState(false);

  function handleSlide(action) {
    if (transitionNext || transitionPrevious) return;
    if (action === "next") {
      setTransitionNext(true);
    } else {
      setTransitionPrevious(true);
    }

    setTimeout(() => {
      setSlides((prevSlide) =>
        action === "next" ? prevSlide + 1 : prevSlide - 1
      );
      setTransitionNext(false);
      setTransitionPrevious(false);
    }, 1000);
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

            if (index === 0 + slides) {
              className = "firstPicture";
            } else if (index === 1 + slides) {
              className = "secondPicture";
            } else if (index === 2 + slides) {
              className = "thirdPicture";
            } else if (index === 3 + slides) {
              className = "fourthPicture";
            } else if (index === slides - 1) {
              className = "nullPicture";
            } else return null;

            return (
              <div key={elem.id} className={styles.pictureContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    elem.poster_path || elem.profile_path
                  }`}
                  alt={elem.title || elem.name}
                  className={`${styles[className]} ${
                    transitionNext ? styles.transitionNext : ""
                  } ${transitionPrevious ? styles.transitionPrevious : ""}`}
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
