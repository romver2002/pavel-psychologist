import Link from "next/link";
import Reveal from "./Reveal";
import { ArticleIcon, ArrowIcon } from "./Icons";
import { getLatestArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";

export default function Articles() {
  const items = getLatestArticles(3);
  return (
    <section id="articles" className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Блог</span>
          <h2>Полезные материалы</h2>
          <p className="lead">
            Короткие статьи о том, как справляться с тревогой, выгоранием и стрессом — и
            жить осознаннее.
          </p>
        </div>

        <div className="grid grid--3">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 70}>
              <Link className="article-card" href={`/articles/${a.slug}/`}>
                <div className="article-card__cover">
                  <ArticleIcon />
                </div>
                <div className="article-card__body">
                  <div className="article-card__meta">
                    {formatDate(a.date)} · {a.readingTime}
                  </div>
                  <h3 className="article-card__title">{a.title}</h3>
                  <p className="article-card__excerpt">{a.description}</p>
                  <span className="article-card__more">
                    Читать <ArrowIcon className="btn__icon" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="section__cta-row">
          <Link href="/articles/" className="btn btn--secondary">
            Все статьи
          </Link>
        </div>
      </div>
    </section>
  );
}
