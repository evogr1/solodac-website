import { useEffect } from "react";
import { consumePendingSection } from "../lib/scrollIntent";

export function useScrollToTop() {
  useEffect(() => {
    if (consumePendingSection()) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
}
