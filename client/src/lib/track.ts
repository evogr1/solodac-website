/**
 * Counts a few key actions (a click on "Book a call", a sent form) on our own server.
 * No cookies, no IP address, no personal data: the server only adds 1 to a daily total
 * for the event and the page it happened on. Call this from handlers only, never during render.
 */
export function track(event: "contact_click" | "form_sent", page = window.location.pathname) {
  try {
    const body = JSON.stringify({ event, page });
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      void fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    }
  } catch {
    // Counting must never get in the way of the visitor.
  }
}
