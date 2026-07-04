import { siteConfig, faq, seo } from "./content";
import type { Article } from "./articles";
import { absoluteUrl, isSet, phoneE164 } from "./utils";

/**
 * Структурированные данные (schema.org, JSON-LD) для SEO и красивых сниппетов.
 *
 * Правило: сущности «всего сайта» (Person, ProfessionalService, WebSite) выводятся
 * в layout на всех страницах; разметка, привязанная к контенту страницы
 * (FAQPage, Article, BreadcrumbList, Blog), — только на своей странице.
 * Иначе поисковики считают это несоответствием разметки контенту.
 */

type JsonLdObject = Record<string, unknown>;

const url = () => siteConfig.url;
const personId = () => `${url()}/#person`;

function siteImage(): string {
  return siteConfig.photo ? absoluteUrl(url(), siteConfig.photo) : `${url()}/og.png`;
}

/** Person — кто оказывает услуги (E-E-A-T: образование, компетенции). */
function personJsonLd(): JsonLdObject {
  const sameAs = [siteConfig.telegram, siteConfig.max, siteConfig.vk, siteConfig.dzen].filter(isSet);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(),
    name: siteConfig.fullName,
    givenName: "Павел",
    familyName: "Зверев",
    alternateName: siteConfig.name,
    jobTitle: "Психолог-консультант, КПТ-терапевт",
    description:
      "Психолог-консультант со специализацией в когнитивно-поведенческой терапии (КПТ). Онлайн-консультации для взрослых: тревога, депрессия, выгорание, стресс, самооценка, отношения, кризисы, зависимое поведение.",
    image: siteImage(),
    url: `${url()}/`,
    email: `mailto:${siteConfig.email}`,
    telephone: phoneE164(siteConfig.phone),
    knowsAbout: [
      "Когнитивно-поведенческая терапия",
      "Психологическое консультирование",
      "Тревожные расстройства",
      "Депрессия",
      "Эмоциональное выгорание",
      "Самооценка",
      "Стресс",
      "Зависимое поведение",
    ],
    knowsLanguage: "ru",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Профессиональная переподготовка",
      name: "Психолог-консультант с дополнительной специализацией в области когнитивно-поведенческой терапии",
      educationalLevel: "Профессиональная переподготовка (с отличием)",
      recognizedBy: {
        "@type": "EducationalOrganization",
        name: "Национальная академия дополнительного профессионального образования (НАДПО)",
        url: "https://sdo.nadpo.ru/",
      },
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** ProfessionalService — сама услуга (локальное SEO: город, страна, каналы). */
function serviceJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url()}/#service`,
    name: `${siteConfig.name} — психолог-консультант (КПТ)`,
    description:
      "Психологические онлайн-консультации в подходе когнитивно-поведенческой терапии. Работа со взрослыми по запросам: тревога, депрессия, выгорание, стресс, самооценка, отношения, кризисы, зависимое поведение. Очный приём — опционально.",
    url: `${url()}/`,
    image: siteImage(),
    telephone: phoneE164(siteConfig.phone),
    email: `mailto:${siteConfig.email}`,
    currenciesAccepted: "RUB",
    ...(isSet(siteConfig.prices.single)
      ? { priceRange: `от ${siteConfig.prices.single} ₽` }
      : {}),
    provider: { "@id": personId() },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: "RU",
    },
    areaServed: [
      { "@type": "Country", name: "Россия" },
      { "@type": "City", name: siteConfig.city },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${url()}/`,
      availableLanguage: "ru",
      serviceType: "Онлайн-консультация по видеосвязи",
    },
  };
}

/** WebSite — сущность сайта. */
function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url()}/#website`,
    name: `${siteConfig.name} — психолог онлайн (КПТ)`,
    url: `${url()}/`,
    inLanguage: "ru",
    description: seo.description,
    publisher: { "@id": personId() },
  };
}

/** Общесайтовая разметка — подключается в layout. */
export function buildSiteJsonLd(): JsonLdObject[] {
  return [personJsonLd(), serviceJsonLd(), websiteJsonLd()];
}

/** FAQPage — только для главной (там расположен блок вопросов). */
export function buildFaqJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url()}/#faq`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Article — для страницы статьи. */
export function buildArticleJsonLd(a: Article): JsonLdObject {
  const pageUrl = `${url()}/articles/${a.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    inLanguage: "ru",
    author: {
      "@type": "Person",
      "@id": personId(),
      name: siteConfig.name,
      url: `${url()}/`,
    },
    publisher: { "@type": "Person", "@id": personId(), name: siteConfig.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    image: `${url()}/og.png`,
  };
}

/** Blog + список статей — для страницы /articles/. */
export function buildBlogJsonLd(items: Article[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url()}/articles/#blog`,
    name: "Статьи о психологии",
    url: `${url()}/articles/`,
    inLanguage: "ru",
    publisher: { "@id": personId() },
    blogPost: items.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${url()}/articles/${a.slug}/`,
      datePublished: a.date,
    })),
  };
}

/** Хлебные крошки: [название, путь][] → BreadcrumbList. */
export function buildBreadcrumbJsonLd(crumbs: Array<[string, string]>): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(url(), path),
    })),
  };
}
