import Link from "next/link";
import Reveal from "./Reveal";
import Placeholder from "./Placeholder";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <Reveal className="hero__content">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="hero__title">{hero.headline}</h1>
          <p className="hero__sub">{hero.subhead}</p>
          <div className="hero__actions">
            <Link href="/#contact" className="btn btn--primary btn--lg">
              {hero.primaryCta}
            </Link>
            <Link href="/#method" className="btn btn--secondary btn--lg">
              {hero.secondaryCta}
            </Link>
          </div>
          <ul className="hero__badges">
            {hero.badges.map((b) => (
              <li key={b} className="badge">
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <Placeholder
            className="hero__photo"
            label="Здесь будет ваше фото"
            dim="портрет · 4:5"
          />
        </Reveal>
      </div>
    </section>
  );
}
