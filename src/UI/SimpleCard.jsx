import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./SimpleCard.css";

export default function SimpleCard({ data, onClick }) {
  const releaseDate =
    data.release_date || data.first_air_date
      ? (data.release_date || data.first_air_date).split("-")[0]
      : null;

  const job = data.known_for_department ? data.known_for_department : null;

  return (
    <Card className="simple-card" onClick={onClick}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${
          data.poster_path || data.profile_path
        }`}
        alt={data.title || data.name || "picture"}
        className="card-media"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#470d1d" }}
        >
          {data.title || data.name || "name"}
          <div
            style={{ fontSize: data.known_for_department ? "18px" : "inherit" }}
          >
            {data.known_for_department ? "" : "("}
            {releaseDate || job}
            {data.known_for_department ? "" : ")"}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
