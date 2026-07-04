import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";
import { getAllArticles, articleLastModified } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const articles = getAllArticles();
  // Честный lastModified: дата свежайшей статьи, а не дата сборки, —
  // иначе каждая пересборка выглядит для поисковиков как «обновление» всех страниц.
  const newest = articles.length
    ? new Date(articleLastModified(articles[0]))
    : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: newest, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/articles/`,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/articles/${a.slug}/`,
    lastModified: new Date(articleLastModified(a)),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
