import "./Pages.scss";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SmallLayout from "../layout/SmallLayout";
import BigLayout from "../layout/BigLayout";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Series() {
  const { showsAiringToday, popularShows, topRatedShows } = useLoaderData();

  return (
    <div className="top-layer">
      <div className="top-left-small-layout-area">
        <SmallLayout
          data={showsAiringToday}
          title="TV Series Airing Today"
          link="shows_airing_today"
          media="tv"
        />{" "}
      </div>
      <div className="top-right-small-layout-area">
        <SmallLayout
          data={popularShows}
          title="Most Popular TV Series"
          link="popular_shows"
          media="tv"
        />{" "}
      </div>
      <div className="big-layout-area">
        <BigLayout
          data={topRatedShows}
          title="Top Rated TV Series"
          link="top_rated_shows"
          media="tv"
        />
      </div>
    </div>
  );
}

export async function showsAiringTodayLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function popularShowsLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function topRatedShowsLoader() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}
