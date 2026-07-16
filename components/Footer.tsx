import Link from "next/link";
import { siteConfig, footer, nav } from "@/lib/content";
import { isSet, telHref } from "@/lib/utils";
import Year from "./Year";

const footerLinks = nav.filter((n) =>
  ["Кому помогаю", "Услуги", "Обо мне", "Статьи", "Вопросы"].includes(n.label),
);

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">{siteConfig.brand}</div>
            <p className="footer__tagline">{footer.tagline}</p>
          </div>

          <div className="footer__col">
            <h4>Разделы</h4>
            <ul>
              {footerLinks.map((l) => (
                <li key={l.anchor}>
                  <Link href={l.anchor}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Контакты</h4>
            <ul>
              {isSet(siteConfig.telegram) && (
                <li>
                  <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                </li>
              )}
              {isSet(siteConfig.max) && (
                <li>
                  <a href={siteConfig.max} target="_blank" rel="noopener noreferrer">
                    MAX
                  </a>
                </li>
              )}
              {isSet(siteConfig.phone) && (
                <li>
                  <a href={telHref(siteConfig.phone)}>{siteConfig.phone}</a>
                </li>
              )}
              {isSet(siteConfig.email) && (
                <li>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
              )}
              <li>
                <Link href="/oferta/">Оферта</Link>
              </li>
              <li>
                <Link href="/terms/">Пользовательское соглашение</Link>
              </li>
              <li>
                <Link href="/privacy/">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__disclaimer">
            {footer.disclaimer}
            <br />
            {siteConfig.legalStatus} {siteConfig.legalName}
            {isSet(siteConfig.inn) ? ` · ИНН ${siteConfig.inn}` : ""} · © <Year fallback={year} />
          </p>
        </div>
      </div>
    </footer>
  );
}
