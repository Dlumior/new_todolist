import { useState, useEffect, Dispatch, SetStateAction } from "react";

type LocalStorageData<T> = {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
};

const useLocalStorage = <T,>(key: string, initialValue: T | null = null): LocalStorageData<T> => {
  const [data, setData] = useState<T | null>(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return {
    data,
    setData,
  };
};

export default useLocalStorage;
