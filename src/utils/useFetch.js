import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent setting state on an unmounted component

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before fetching

        const response = await fetch(url);

        // Check if response is not OK (e.g., 404, 500)
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
