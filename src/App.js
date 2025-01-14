import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home, { upcomingMoviesLoader, popularPeopleLoader } from "./pages/Home";
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
import UpcomingMovies from "./home-pages/UpcomingMovies";
import PopularPeople from "./home-pages/PopularPeople";
import MoviesPlayingNow from "./movies-pages/MoviesPlayingNow";
import PopularMovies from "./movies-pages/PopularMovies";
import TopRatedMovies from "./movies-pages/TopRatedMovies";
import PopularShows from "./tvseries-pages/PopularShows";
import TopRatedShows from "./tvseries-pages/TopRatedShows";
import ShowsAiringToday from "./tvseries-pages/ShowsAiringToday";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const upcomingMovies = await upcomingMoviesLoader();
          const popularPeople = await popularPeopleLoader();
          return { upcomingMovies, popularPeople };
        },
        errorElement: <div>Error loading homepage.</div>,
      },
      {
        path: "upcoming",
        element: <UpcomingMovies />,
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
        errorElement: <div>Error loading movies.</div>,
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
        errorElement: <div>Error loading tv shows.</div>,
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
