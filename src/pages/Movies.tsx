import "./Pages.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SmallLayout from "../layout/SmallLayout";
import BigLayout from "../layout/BigLayout";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Movies() {
  const { topRatedMovies, moviesPlayingNow, popularMovies } = useLoaderData();

  return (
    <div className="top-layer">
      <SmallLayout
        data={moviesPlayingNow}
        title="Movies Playing Now"
        link="movies_playing_now"
        media="movie"
      />
      <SmallLayout
        data={popularMovies}
        title="Most Popular Movies"
        link="popular_movies"
        media="movie"
      />
      <BigLayout
        data={topRatedMovies}
        title="Top Rated Movies"
        link="top_rated_movies"
        media="movie"
      />
    </div>
  );
}

export async function moviesPlayingNowLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function popularMoviesLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function topRatedMoviesLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}
