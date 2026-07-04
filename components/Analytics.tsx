"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/content";
import { isSet } from "@/lib/utils";

const CONSENT_KEY = "cookie-consent-v1";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

/**
 * Яндекс.Метрика с уважением к согласию (152-ФЗ):
 * счётчик загружается ТОЛЬКО если в lib/content.ts задан yandexMetrikaId
 * И посетитель нажал «Принять» в cookie-баннере (сразу или позже — слушаем событие).
 */
export default function Analytics() {
  useEffect(() => {
    const id = siteConfig.yandexMetrikaId;
    if (!isSet(id)) return;

    let loaded = false;
    const load = () => {
      if (loaded || window.ym) return;
      loaded = true;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(s);
      window.ym =
        window.ym ||
        function (...args: unknown[]) {
          ((window.ym as { a?: unknown[][] }).a =
            (window.ym as { a?: unknown[][] }).a || []).push(args);
        };
      (window.ym as { l?: number }).l = Date.now();
      window.ym(Number(id), "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      });
    };

    try {
      if (localStorage.getItem(CONSENT_KEY) === "accepted") load();
    } catch {
      /* localStorage недоступен — аналитику не грузим */
    }

    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") load();
    };
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  return null;
}
