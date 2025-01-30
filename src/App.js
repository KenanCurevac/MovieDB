import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home, {
  upcomingMoviesLoader,
  popularPeopleLoader,
  upcomingShowsLoader,
} from "./pages/Home";
import Movies, {
  moviesPlayingNowLoader,
  popularMoviesLoader,
  topRatedMoviesLoader,
} from "./pages/Movies";
import Series, {
  showsAiringTodayLoader,
  popularShowsLoader,
  topRatedShowsLoader,
} from "./pages/Shows";
import UpcomingMovies from "./subpages/UpcomingMovies";
import PopularPeople from "./subpages/PopularPeople";
import MoviesPlayingNow from "./subpages/MoviesPlayingNow";
import PopularMovies from "./subpages/PopularMovies";
import TopRatedMovies from "./subpages/TopRatedMovies";
import PopularShows from "./subpages/PopularShows";
import TopRatedShows from "./subpages/TopRatedShows";
import ShowsAiringToday from "./subpages/ShowsAiringToday";
import ErrorPage from "./UI/ErrorPage";
import UpcomingShows from "./subpages/UpcomingShows";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const upcomingMovies = await upcomingMoviesLoader();
          const popularPeople = await popularPeopleLoader();
          const upcomingShows = await upcomingShowsLoader();
          return { upcomingMovies, popularPeople, upcomingShows };
        },
      },
      {
        path: "upcoming_movies",
        element: <UpcomingMovies />,
      },
      {
        path: "upcoming_shows",
        element: <UpcomingShows />,
      },
      {
        path: "popular_people",
        element: <PopularPeople />,
      },
      {
        path: "movies",
        element: <Movies />,
        loader: async () => {
          const moviesPlayingNow = await moviesPlayingNowLoader();
          const popularMovies = await popularMoviesLoader();
          const topRatedMovies = await topRatedMoviesLoader();
          return { topRatedMovies, moviesPlayingNow, popularMovies };
        },
      },
      {
        path: "movies/movies_playing_now",
        element: <MoviesPlayingNow />,
      },
      {
        path: "movies/popular_movies",
        element: <PopularMovies />,
      },
      {
        path: "movies/top_rated_movies",
        element: <TopRatedMovies />,
      },
      {
        path: "tvshows",
        element: <Series />,
        loader: async () => {
          const showsAiringToday = await showsAiringTodayLoader();
          const popularShows = await popularShowsLoader();
          const topRatedShows = await topRatedShowsLoader();
          return { showsAiringToday, popularShows, topRatedShows };
        },
      },
      {
        path: "tvshows/popular_shows",
        element: <PopularShows />,
      },
      {
        path: "tvshows/shows_airing_today",
        element: <ShowsAiringToday />,
      },
      {
        path: "tvshows/top_rated_shows",
        element: <TopRatedShows />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
