import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { buildBlogJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/JsonLd";
import { ArticleIcon, ArrowIcon } from "@/components/Icons";

const title = "Статьи о психологии";
const description =
  "Статьи психолога-консультанта о тревоге, выгорании, самооценке и о том, как жить счастливее. Практические материалы в подходе КПТ.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/articles/" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteConfig.url}/articles/`,
    images: ["/og.png"],
  },
};

export default function ArticlesPage() {
  const items = getAllArticles();
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Блог</span>
          <h1>Статьи о психологии: тревога, выгорание, самооценка</h1>
          <p className="lead">
            Практические материалы о том, как справляться с трудными состояниями и жить
            осознаннее.
          </p>
        </div>

        <div className="grid grid--3">
          {items.map((a) => (
            <Link key={a.slug} className="article-card" href={`/articles/${a.slug}/`}>
              <div className="article-card__cover">
                <ArticleIcon />
              </div>
              <div className="article-card__body">
                <div className="article-card__meta">
                  {formatDate(a.date)} · {a.readingTime}
                </div>
                <h2 className="article-card__title">{a.title}</h2>
                <p className="article-card__excerpt">{a.description}</p>
                <span className="article-card__more">
                  Читать <ArrowIcon className="btn__icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <JsonLd
        data={[
          buildBlogJsonLd(items),
          buildBreadcrumbJsonLd([
            ["Главная", "/"],
            ["Статьи", "/articles/"],
          ]),
        ]}
      />
    </section>
  );
}
