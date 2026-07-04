import Reveal from "./Reveal";
import Disciplines from "./Disciplines";
import { about, disciplines, cbtMethods } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="section section--tint">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2>{about.title}</h2>
        </div>
        <div className="about__grid">
          <Reveal className="about__text">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={100}>
            <div className="credentials">
              <span className="credentials__badge">Диплом НАДПО · с отличием</span>
              <p className="credentials__text">{about.credentialsIntro}</p>
              <p className="credentials__text" style={{ marginTop: "16px" }}>
                {about.disciplinesIntro}
              </p>
              <Disciplines items={[...disciplines]} />
              <p className="credentials__text" style={{ marginTop: "20px" }}>
                {about.methodsIntro}
              </p>
              <Disciplines
                items={[...cbtMethods]}
                closedText={`Показать методы КПТ (${cbtMethods.length})`}
                openText="Скрыть методы КПТ"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
