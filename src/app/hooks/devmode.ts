"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export function useDevMode(
  secrets: string[] | string = ["kingcode99", "zoro088502", "ivan_crysis"]
) {
  const searchParams = useSearchParams();
  const [isDevMode, setIsDevMode] = useState(false);

  // Normalize secrets to an array
  const secretList = useMemo(
    () => (Array.isArray(secrets) ? secrets : [secrets]),
    [secrets]
  );

  useEffect(() => {
    const devParam = searchParams.get("devmode");

    if (devParam && secretList.includes(devParam)) {
      localStorage.setItem("devmode", "true");
      setIsDevMode(true);
    } else {
      localStorage.removeItem("devmode");
      setIsDevMode(false);
    }
  }, [searchParams, secrets, secretList]);

  return isDevMode;
}
