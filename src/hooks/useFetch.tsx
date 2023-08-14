import { useState, useEffect } from "react";
import { FetchOptions, createFetcher } from "@/utils/fetchData";

type FetchData<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

const fetcher = createFetcher("localhost:3000");

function useFetch<T>(url: string, options?: FetchOptions): FetchData<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDataFn = async () => {
      setIsLoading(true);
      try {
        const result = await fetcher<T>(url, options);
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataFn();
  }, [url, options]);

  return { data, isLoading, error };
}

export default useFetch;
