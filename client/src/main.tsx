import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { startSmoothScroll } from "./lib/smoothScroll";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

startSmoothScroll();

createRoot(document.getElementById("root")!).render(<App />);
