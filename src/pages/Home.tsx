import "./Pages.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SmallLayout from "../layout/SmallLayout";
import TrailerLayout from "../layout/TrailerLayout";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Home() {
  const { upcomingMovies, popularPeople, upcomingShows } = useLoaderData();

  return (
    <div className="top-layer">
      <TrailerLayout
        data={upcomingMovies}
        title="Upcoming Movies"
        link="upcoming_movies"
      />
      <SmallLayout
        data={upcomingShows}
        title="Upcoming TV Series"
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
  );
}

export async function upcomingMoviesLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
        Authorization: `Bearer ${apiKey}`,
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
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}
