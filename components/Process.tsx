import Reveal from "./Reveal";
import { process } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2>{process.title}</h2>
          <p className="lead">{process.intro}</p>
        </div>
        <div className="steps">
          {process.steps.map((st, i) => (
            <Reveal key={st.title} delay={(i % 4) * 70}>
              <div className="step">
                <div className="step__num">{i + 1}</div>
                <div className="step__title">{st.title}</div>
                <p className="step__text">{st.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
