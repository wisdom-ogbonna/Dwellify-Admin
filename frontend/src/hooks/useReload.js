import { useState, useCallback } from "react";

export function useReload(fetchDataFunction) {
  const [isLoading, setIsLoading] = useState(false);

  const reload = useCallback(async () => {
    if (isLoading || !fetchDataFunction) return;

    setIsLoading(true);
    try {
      await fetchDataFunction();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, fetchDataFunction]);

  return { isLoading, reload };
}
