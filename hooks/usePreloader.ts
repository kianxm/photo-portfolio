import { useState } from "react";

export function usePreloader() {
  const [loading, setLoading] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setPreloaderComplete(true);
    }, 1000); // Add a small delay for smoother transition
  };

  return {
    loading,
    preloaderComplete,
    handlePreloaderComplete,
  };
}
