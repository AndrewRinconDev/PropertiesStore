import { useState, useEffect } from "react";

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const useApi = <T>(url: string, options?: RequestInit): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
};

export default useApi;
