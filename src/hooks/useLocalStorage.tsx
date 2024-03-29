import { useState, useEffect, SetStateAction } from "react";
import { isServer } from "@/utils/isServer";

type LocalStorageData<T> = {
  data: T;
  setValue: (value: SetStateAction<T | null>) => void;
};

const useLocalStorage = <T,>(key: string, initialValue: T | null = null): LocalStorageData<T | null> => {
  const [data, setData] = useState<T | null>(() => initialValue);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  useEffect(() => {
    if (!isServer) {
      setData(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = (value: SetStateAction<T | null>) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(data) : value;
      // Save state
      setData(valueToStore);
      // Save to local storage
      if (!isServer) {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return {
    data,
    setValue,
  };
};

export default useLocalStorage;
