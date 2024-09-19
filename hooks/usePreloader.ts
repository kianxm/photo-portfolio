import { useState } from "react";

export function usePreloader() {
  const [loading, setLoading] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setPreloaderComplete(true);
    }, 7000); // Add a small delay for smoother transition
  };

  return {
    loading,
    preloaderComplete,
    handlePreloaderComplete,
  };
}
