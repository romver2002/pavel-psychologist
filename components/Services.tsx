import Reveal from "./Reveal";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section section--tint">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{services.eyebrow}</span>
          <h2>{services.title}</h2>
          <p className="lead">{services.intro}</p>
        </div>
        <div className="grid grid--3">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <article className="service">
                <div className="service__format">{s.format}</div>
                <h3>{s.title}</h3>
                <p className="service__desc">{s.description}</p>
                <div className="service__price">{s.price}</div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="section__note">{services.note}</p>
      </div>
    </section>
  );
}
