import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop — scrolls window to (0, 0) on every route change.
 * Place this inside the Router, above the <Switch>.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
