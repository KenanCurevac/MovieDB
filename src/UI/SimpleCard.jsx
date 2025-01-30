import "./SimpleCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import noPicture from "../assets/placeholder.jpg";

export default function SimpleCard({ data, onClick, rank }) {
  const releaseDate =
    data.release_date || data.first_air_date
      ? (data.release_date || data.first_air_date).split("-")[0]
      : null;

  const job = data.known_for_department ? data.known_for_department : null;

  return (
    <Card className="simple-card" onClick={onClick}>
      <CardMedia
        component="img"
        image={
          data.poster_path || data.profile_path
            ? `https://image.tmdb.org/t/p/w500${
                data.poster_path || data.profile_path
              }`
            : noPicture
        }
        alt={data.title || data.name || "picture"}
        className="simple-card-picture"
      />
      <CardContent className="simple-card-content">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-text"
        >
          {data.title || data.name || "name"}
          <div
            style={{ fontSize: data.known_for_department ? "18px" : "inherit" }}
          >
            {data.known_for_department ? "" : "("}
            {releaseDate || job}
            {data.known_for_department ? "" : ")"}
          </div>
          <div className="simple-card-data">
            <div className="rank">#{rank} </div>
            <div className="rating-container">
              <div
                className="rating"
                style={{ padding: data.vote_average ? "7%" : "" }}
              >
                {data.vote_average ? data.vote_average.toFixed(1) : null}
              </div>
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
