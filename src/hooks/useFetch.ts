import { useEffect, useState } from "react";

type FetchFunction<T> = () => Promise<T>;

type FetchState<T> = {
  fetchedData: T | null;
  isFetching: boolean;
  error: { message: string } | null;
};

export default function useFetch<T>(fetchFun: FetchFunction<T>): FetchState<T> {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFun();
        setFetchedData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError({ message: error.message });
        } else {
          setError({ message: "An unexpected error occurred." });
        }
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFun]);

  return {
    fetchedData,
    isFetching,
    error,
  };
}
