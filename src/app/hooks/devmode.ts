"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useDevMode(secret = "kingcode99") {
  const searchParams = useSearchParams();
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    const devParam = searchParams.get("devmode");

    if (devParam === secret) {
      localStorage.setItem("devmode", "true");
      setIsDevMode(true);
    } else {
      // If the param is not present or invalid, disable devmode
      localStorage.removeItem("devmode");
      setIsDevMode(false);
    }
  }, [searchParams]);

  return isDevMode;
}
