import "./SimpleCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import noPicture from "../assets/placeholder.jpg";
import { MovieSimple } from "../models/movieSimple";
import { ShowSimple } from "../models/showSimple";
import { PersonSimple } from "../models/personSimple";

type SimpleCardProps = {
  data: MovieSimple | ShowSimple | PersonSimple;
  onOpenModal: (id: number) => void;
  rank: number;
};

export default function SimpleCard({
  data,
  onOpenModal,
  rank,
}: SimpleCardProps) {
  const isMovie = data && "release_date" in data;
  const isShow = data && "first_air_date" in data;
  const isPerson = data && "known_for_department" in data;

  const releaseDate = isMovie
    ? data.release_date.split("-")[0]
    : isShow
    ? data.first_air_date.split("-")[0]
    : null;

  let imageSrc = noPicture;

  if (isMovie || isShow) {
    if (data.poster_path) {
      imageSrc = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
  } else if (isPerson) {
    if (data.profile_path) {
      imageSrc = `https://image.tmdb.org/t/p/w500${data.profile_path}`;
    }
  }

  return (
    <Card
      component="div"
      className="simple-card"
      onClick={() => onOpenModal(data.id)}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt={
          isMovie
            ? "Movie Poster"
            : isShow
            ? "TV Series Poster"
            : isPerson
            ? "Person Poster"
            : "Media Picture"
        }
        className="simple-card-picture"
      />
      <CardContent className="simple-card-content">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-text"
        >
          {isMovie ? data.title : isShow || isPerson ? data.name : "No name"}
          <div
            style={{
              fontSize:
                isPerson && data.known_for_department ? "18px" : "inherit",
            }}
          >
            {isPerson && data.known_for_department ? "" : "("}
            {releaseDate || (isPerson && data.known_for_department)}
            {isPerson && data.known_for_department ? "" : ")"}
          </div>
          <div className="simple-card-data">
            <div className="rank">#{rank} </div>
            <div className="rating-container">
              <div
                className="rating"
                style={{
                  padding: isMovie || isShow ? "7%" : "",
                }}
              >
                {isMovie || isShow ? data.vote_average.toFixed(1) : null}
              </div>
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
