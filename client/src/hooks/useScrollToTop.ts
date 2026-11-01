import { useEffect } from "react";
import { scrollToTopNow } from "../lib/smoothScroll";

export function useScrollToTop() {
  useEffect(() => {
    scrollToTopNow();
  }, []);
}
