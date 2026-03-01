import { useState, useCallback } from "react";

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    (text) => {
      if (!text) return;

      // Check if the browser supports the Clipboard API
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        return;
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), timeout);
        })
        .catch((err) => console.error("Copy failed", err));
    },
    [timeout],
  );

  return { hasCopied, copy };
}
