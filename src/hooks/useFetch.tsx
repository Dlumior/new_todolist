import { useState, useEffect } from "react";
import fetchData, { FetchOptions } from "@/utils/fetchData";

type FetchData<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

function useFetch<T>(url: string, options?: FetchOptions): FetchData<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDataFn = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData<T>(url, options);
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
