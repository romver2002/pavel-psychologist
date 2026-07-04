import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head section__head--center">
          <span className="eyebrow">Ошибка 404</span>
          <h1>Такой страницы нет</h1>
          <p className="lead">
            Возможно, страница была перемещена или в адресе опечатка. Всё самое важное —
            на главной: с чем я помогаю, как проходит работа и как записаться.
          </p>
        </div>
        <div className="section__cta-row" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn--primary">
            На главную
          </Link>
          <Link href="/articles/" className="btn btn--secondary">
            Читать статьи
          </Link>
        </div>
      </div>
    </section>
  );
}
