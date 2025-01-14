import styles from "./TrailerLayout.module.css";
import { useState, useEffect } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TrailerLayout({ data, title, link }) {
  const [slides, setSlides] = useState(0);
  const [trailer, setTrailer] = useState(null);

  const movieIndex = slides + 1;
  const movieToShow = data[movieIndex].id;

  const initialDate = data[movieIndex].release_date;
  const [year, month, day] = initialDate.split("-");
  const releaseDate = `${day}.${month}.${year}`;

  useEffect(() => {
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

  return (
    <div className={styles.sectionContainer}>
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
          <div className={styles.posterSlide}>
            {data.map((elem, index) => {
              let className = "";

              if (-1 + slides === index) {
                className = "previousPicture";
              } else if (0 + slides === index) {
                className = "onTheLeft";
              } else if (1 + slides === index) {
                className = "middlePicture";
              } else if (2 + slides === index) {
                className = "onTheRight";
              } else if (3 + slides === index) {
                className = "nextPicture";
              } else return null;

              return (
                <div
                  key={elem.id}
                  className={`${styles.pictureContainer} ${
                    className === "onTheLeft" || className === "onTheRight"
                      ? styles.perspective
                      : ""
                  } `}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      elem.poster_path || elem.profile_path
                    }`}
                    alt={elem.title || elem.name}
                    className={`${styles[className]} ${styles.image}`}
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
      <div className={styles.trailerContainer}>
        <div className={styles.watchTrailer}>WATCH TRAILER</div>
        {trailer && (
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            frameBorder="0"
          ></iframe>
        )}
        <div className={styles.trailerInfo}>
          <div className={styles.trailerTitle}>{data[movieIndex].title}</div>
          <div className={styles.date}>Release Date:</div>
          <div className={styles.date}>{releaseDate}</div>
        </div>
      </div>
    </div>
  );
}

async function fetchTrailers(movieId) {
  try {
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
  } catch (error) {
    throw new Response("Failed to fetch upcoming movies trailer", {
      status: error.response?.status || 500,
    });
  }
}
