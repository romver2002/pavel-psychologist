import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticle,
  articleLastModified,
  type Block,
} from "@/lib/articles";
import { siteConfig } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonLd";
import JsonLd from "@/components/JsonLd";
import { ArticleIcon } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `${siteConfig.url}/articles/${a.slug}/`;
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/articles/${a.slug}/` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url,
      publishedTime: a.date,
      modifiedTime: articleLastModified(a),
      authors: [`${siteConfig.url}/`],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
      images: ["/og.png"],
    },
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    default:
      return <p key={i}>{b.text}</p>;
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = getAllArticles()
    .filter((x) => x.slug !== a.slug)
    .slice(0, 2);

  return (
    <article>
      <section className="article-hero">
        <div className="container">
          <Link className="back-link" href="/articles/">
            <span aria-hidden="true">←</span> Все статьи
          </Link>
          <div className="prose">
            <span className="eyebrow">
              {formatDate(a.date)} · {a.readingTime}
            </span>
            <h1>{a.title}</h1>
          </div>
        </div>
      </section>

      <section className="section article-body">
        <div className="container">
          <div className="prose">
            {a.blocks.map((b, i) => renderBlock(b, i))}
            <div className="article-cta">
              <p>
                Если тема откликается и вы хотите разобраться в своей ситуации —{" "}
                <Link href="/#contact">запишитесь на консультацию</Link>. Написать первое
                сообщение ничего не стоит и ни к чему не обязывает.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <div className="section__head section__head--center">
              <span className="eyebrow">Читайте также</span>
              <h2>Похожие статьи</h2>
            </div>
            <div className="grid grid--2">
              {related.map((r) => (
                <Link key={r.slug} className="article-card" href={`/articles/${r.slug}/`}>
                  <div className="article-card__cover">
                    <ArticleIcon />
                  </div>
                  <div className="article-card__body">
                    <div className="article-card__meta">
                      {formatDate(r.date)} · {r.readingTime}
                    </div>
                    <h3 className="article-card__title">{r.title}</h3>
                    <p className="article-card__excerpt">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          buildArticleJsonLd(a),
          buildBreadcrumbJsonLd([
            ["Главная", "/"],
            ["Статьи", "/articles/"],
            [a.title, `/articles/${a.slug}/`],
          ]),
        ]}
      />
    </article>
  );
}
