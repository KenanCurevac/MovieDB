import "./Pages.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SmallLayout from "../layout/SmallLayout";
import TrailerLayout from "../layout/TrailerLayout";
import TrailerModal from "../UI/TrailerModal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState("");

  const { upcomingMovies, popularPeople, upcomingShows } = useLoaderData();

  console.log(upcomingShows, "serije");

  const handlePlayTrailer = (trailer) => {
    setOpen(true);
    setTrailer(trailer);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TrailerModal open={open} onClose={handleClose} trailer={trailer} />

      <div className="top-layer">
        <TrailerLayout
          data={upcomingMovies}
          title="Upcoming Movies"
          link="upcoming_movies"
          onPlayTrailer={handlePlayTrailer}
        />
        <SmallLayout
          data={upcomingShows}
          title="Upcoming TV Shows"
          link="upcoming_shows"
          media="tv"
        />
        <SmallLayout
          data={popularPeople}
          title="Popular People"
          link="popular_people"
          media="person"
        />
      </div>
    </>
  );
}

export async function upcomingMoviesLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
      },
    }
  );
  return response.data.results;
}

export async function popularPeopleLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
      },
    }
  );
  return response.data.results;
}

export async function upcomingShowsLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
      },
    }
  );
  return response.data.results;
}
