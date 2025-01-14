import "./Pages.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SmallLayout from "../layout/SmallLayout";
import BigLayout from "../layout/BigLayout";

export default function Movies() {
  const { topRatedMovies, moviesPlayingNow, popularMovies } = useLoaderData();

  return (
    <div className="top-layer">
      <SmallLayout
        data={moviesPlayingNow}
        title="Movies Playing Now"
        link="movies_playing_now"
      />
      <SmallLayout
        data={popularMovies}
        title="Most Popular Movies"
        link="popular_movies"
      />
      <BigLayout
        data={topRatedMovies}
        title="Top Rated Movies"
        link="top_rated_movies"
      />
    </div>
  );
}

export async function moviesPlayingNowLoader() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
        },
      }
    );
    return response.data.results;
  } catch (error) {
    throw new Response("Failed to fetch movies playing now", {
      status: error.response?.status || 500,
    });
  }
}

export async function popularMoviesLoader() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
        },
      }
    );
    return response.data.results;
  } catch (error) {
    throw new Response("Failed to fetch most popular movies", {
      status: error.response?.status || 500,
    });
  }
}

export async function topRatedMoviesLoader() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODA2ZGE1MmE5OGRmMWZiYjE3ZDI2MzQ3YWFmY2M3MSIsIm5iZiI6MTczNDgwNjM1Mi41NCwic3ViIjoiNjc2NzBiNTBmOTI2YmUwM2NjNzRkYWM1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YApZl3xZbfxp2iuTGtkGV0d2kV6X85FxC8JWlmyi0rQ",
        },
      }
    );
    return response.data.results;
  } catch (error) {
    throw new Response("Failed to fetch top rated movies", {
      status: error.response?.status || 500,
    });
  }
}
