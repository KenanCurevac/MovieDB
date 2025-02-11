import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

export async function fetchPopularPeople(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchUpcomingMovies(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchUpcomingShows(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchMoviesPlayingNow(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchPopularMovies(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchTopRatedMovies(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchPopularShows(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchShowsAiringToday(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchTopRatedShows(page: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.results;
}

export async function fetchSearch(query: string) {
  const encodedQuery = encodeURIComponent(query);

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${encodedQuery}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.results;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Response(error.message, {
        status: error.response?.status || 500,
      });
    } else {
      throw new Response("Error fetching search data", { status: 500 });
    }
  }
}

export async function fetchDetails(media: string, id: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${media}/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data;
}
