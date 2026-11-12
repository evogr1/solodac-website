import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getLeadConfig } from "@/lib/forms";

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
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
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
 *
 * There is no other route for a form. If the check cannot finish, `waitForToken` returns ""
 * and the form tells the visitor to email us instead.
 */
export function useHumanCheck(): {
  enabled: boolean;
  widget: ReactNode;
  waitForToken: (ms: number) => Promise<string>;
  reset: () => void;
} {
  const [siteKey, setSiteKey] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef("");
  const token = useRef("");
  const waiting = useRef<Array<(value: string) => void>>([]);
  // Set when the check cannot run at all (script blocked, challenge error), so a submit does not wait for nothing.
  const failed = useRef(false);

  const deliver = useCallback((value: string) => {
    token.current = value;
    if (value) for (const resolve of waiting.current.splice(0)) resolve(value);
  }, []);

  useEffect(() => {
    let off = false;
    void getLeadConfig().then(config => {
      if (!off && config.turnstileSiteKey) setSiteKey(config.turnstileSiteKey);
    });
    return () => {
      off = true;
    };
  }, []);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    const giveUp = () => {
      failed.current = true;
      token.current = "";
      for (const resolve of waiting.current.splice(0)) resolve("");
    };
    loadTurnstile()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile) return;
        failed.current = false;
        widgetId.current = window.turnstile.render(box.current, {
          sitekey: siteKey,
          theme: "dark",
          appearance: "interaction-only",
          callback: (value: string) => deliver(value),
          "expired-callback": () => deliver(""),
          "error-callback": giveUp,
        });
      })
      .catch(giveUp);
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = "";
    };
  }, [siteKey, deliver]);

  /** Resolves with the token as soon as there is one, or "" after `ms` (or when the check fails). */
  const waitForToken = useCallback(
    (ms: number) =>
      token.current
        ? Promise.resolve(token.current)
        : failed.current
          ? Promise.resolve("")
          : new Promise<string>(resolve => {
              const timer = setTimeout(() => resolve(token.current), ms);
              waiting.current.push(value => {
                clearTimeout(timer);
                resolve(value);
              });
            }),
    []
  );

  const reset = useCallback(() => {
    token.current = "";
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, []);

  return {
    enabled: Boolean(siteKey),
    widget: <div ref={box} />,
    waitForToken,
    reset,
  };
}
