/**
 * Типы контента сайта. Единая точка правды для структуры данных:
 * контент в lib/content.ts и lib/articles.ts обязан соответствовать этим типам
 * (проверяется компилятором через `satisfies`).
 */

/** Пункт навигации (якорь на главной или маршрут). */
export type NavItem = {
  label: string;
  anchor: string;
};

/** Карточка «с чем помогаю». */
export type HelpItem = {
  title: string;
  description: string;
};

/** Принцип метода (КПТ). */
export type Principle = {
  title: string;
  description: string;
};

/** Услуга / формат работы. */
export type Service = {
  title: string;
  format: string;
  description: string;
  price: string;
};

/** Шаг процесса «как начать». */
export type ProcessStep = {
  title: string;
  description: string;
};

/** Диплом / сертификат. Пустой image — показывается заглушка. */
export type Diploma = {
  title: string;
  subtitle: string;
  image: string;
  /** Размеры скана (для <img width/height> — предотвращает сдвиг макета). */
  width?: number;
  height?: number;
};

/** Отзыв клиента. */
export type Review = {
  name: string;
  context: string;
  text: string;
};

/** Вопрос-ответ для FAQ (и микроразметки FAQPage). */
export type FaqItem = {
  q: string;
  a: string;
};

/** Глобальные настройки сайта: идентичность, контакты, юр-данные, интеграции. */
export type SiteConfig = {
  name: string;
  fullName: string;
  brand: string;
  role: string;
  domain: string;
  url: string;
  city: string;
  email: string;
  phone: string;
  photo: string;
  telegram: string;
  max: string;
  vk: string;
  dzen: string;
  legalName: string;
  legalStatus: string;
  inn: string;
  prices: {
    single: string;
    package: string;
  };
  /** ID счётчика Яндекс.Метрики. Пусто — аналитика не подключается. */
  yandexMetrikaId: string;
  /** Коды подтверждения прав на сайт (пустые — метатеги не выводятся). */
  verification: {
    yandex: string;
    google: string;
  };
};
