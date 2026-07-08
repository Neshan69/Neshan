import { useEffect, useState } from "react";

const QUERY = "(max-width: 768px)";

// The site uses a vertical scroll on small screens and a horizontal snap-scroll
// on larger viewports. This hook returns true when the layout is vertical.
export default function useIsVertical() {
  const [isVertical, setIsVertical] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(QUERY);
    const onChange = () => setIsVertical(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isVertical;
}
