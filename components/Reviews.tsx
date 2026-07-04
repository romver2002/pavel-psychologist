import Reveal from "./Reveal";
import { reviews } from "@/lib/content";

export default function Reviews() {
  return (
    <section id="reviews" className="section section--tint">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{reviews.eyebrow}</span>
          <h2>{reviews.title}</h2>
        </div>
        <div className="grid grid--3">
          {reviews.items.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 70}>
              <figure className="review">
                <blockquote className="review__quote">{r.text}</blockquote>
                <figcaption>
                  <div className="review__author">{r.name}</div>
                  <div className="review__context">{r.context}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="section__note">{reviews.note}</p>
      </div>
    </section>
  );
}
