import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getLeadConfig } from "@/lib/web3forms";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptReady: Promise<void> | null = null;
function loadTurnstile() {
  scriptReady ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
  return scriptReady;
}

/**
 * Cloudflare Turnstile, the free human check. It stays out of the way: the visitor only sees
 * something if Cloudflare cannot tell they are a person. It runs only when the Worker says the
 * protected form route is on; otherwise `enabled` is false and nothing loads.
 */
export function useHumanCheck(): { enabled: boolean; token: string; widget: ReactNode; reset: () => void } {
  const [siteKey, setSiteKey] = useState("");
  const [token, setToken] = useState("");
  // If the check cannot load (an ad blocker, a network block), the form falls back to the plain route
  // rather than lock a real customer out.
  const [failed, setFailed] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef("");

  useEffect(() => {
    let off = false;
    void getLeadConfig().then((config) => {
      if (!off && config.turnstileSiteKey) setSiteKey(config.turnstileSiteKey);
    });
    return () => {
      off = true;
    };
  }, []);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(box.current, {
          sitekey: siteKey,
          theme: "dark",
          appearance: "interaction-only",
          callback: (value: string) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setFailed(true),
        });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = "";
    };
  }, [siteKey]);

  const reset = useCallback(() => {
    setToken("");
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, []);

  return { enabled: Boolean(siteKey) && !failed, token, widget: <div ref={box} />, reset };
}
