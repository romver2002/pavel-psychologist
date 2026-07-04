import Reveal from "./Reveal";
import { method } from "@/lib/content";

export default function Method() {
  return (
    <section id="method" className="section">
      <div className="container method__grid">
        <Reveal className="method__text">
          <span className="eyebrow">{method.eyebrow}</span>
          <h2>{method.title}</h2>
          <p className="method__lead">{method.lead}</p>
          {method.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="principles" delay={100}>
          {method.principles.map((pr, i) => (
            <div className="principle" key={pr.title}>
              <span className="principle__num">{i + 1}</span>
              <div>
                <div className="principle__title">{pr.title}</div>
                <p className="principle__text">{pr.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
