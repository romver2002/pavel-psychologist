import Reveal from "./Reveal";
import { whoIHelp } from "@/lib/content";

export default function WhoIHelp() {
  return (
    <section id="who" className="section section--tint">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{whoIHelp.eyebrow}</span>
          <h2>{whoIHelp.title}</h2>
          <p className="lead">{whoIHelp.intro}</p>
        </div>
        <div className="grid grid--4">
          {whoIHelp.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 4) * 60}>
              <article className="who-card">
                <h3 className="who-card__title">{it.title}</h3>
                <p className="who-card__text">{it.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="section__note">{whoIHelp.note}</p>
      </div>
    </section>
  );
}
