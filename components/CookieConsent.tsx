"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cookie-consent-v1";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage недоступен — баннер не показываем */
    }
  }, []);

  if (!show) return null;

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
      // ВАЖНО: аналитику (Яндекс.Метрику) инициализируйте только при value === "accepted".
      window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
    } catch {
      /* игнорируем */
    }
    setShow(false);
  };

  return (
    <div className="cookie" role="region" aria-label="Уведомление о файлах cookie">
      <p className="cookie__text">
        Мы используем файлы cookie и веб-аналитику (Яндекс.Метрика) для работы и улучшения
        сайта. Нажимая «Принять», вы даёте согласие на их использование. Подробнее — в{" "}
        <Link href="/privacy/">политике обработки персональных данных</Link>.
      </p>
      <div className="cookie__actions">
        <button
          type="button"
          className="btn btn--primary cookie__btn"
          onClick={() => decide("accepted")}
        >
          Принять
        </button>
        <button
          type="button"
          className="btn btn--secondary cookie__btn"
          onClick={() => decide("declined")}
        >
          Отклонить
        </button>
      </div>
    </div>
  );
}
