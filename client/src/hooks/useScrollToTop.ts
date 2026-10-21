import { useEffect } from "react";
import { consumePendingSection } from "../lib/scrollIntent";
import { scrollToTopNow } from "../lib/smoothScroll";

export function useScrollToTop() {
  useEffect(() => {
    if (consumePendingSection()) return;
    scrollToTopNow();
  }, []);
}
