/** Общие утилиты. Без зависимостей от React — используются и в серверном, и в клиентском коде. */

/** Значение заполнено (не пустое и не плейсхолдер вида {{...}}). */
export function isSet(v: string): boolean {
  return !!v && !v.includes("{{");
}

/**
 * Строчная только первая буква (для подстановки в середину предложения,
 * напр. «…является самозанятым…», сохраняя аббревиатуры вроде «НПД»).
 */
export function lowerFirst(s: string): string {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

/** href для ссылки «позвонить»: убирает всё, кроме цифр и «+». */
export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

/** Телефон в машиночитаемом формате E.164 (для schema.org). */
export function phoneE164(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/** Абсолютный URL страницы сайта из относительного пути. */
export function absoluteUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Путь к статике из /public с учётом basePath (для деплоя в подпапку).
 * next/link и next/font префиксует сам; «сырые» <img src> — нет, поэтому им нужен
 * этот хелпер. При пустом NEXT_PUBLIC_BASE_PATH возвращает путь как есть.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Дата в человекочитаемом виде: «20 мая 2026 г.». */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
