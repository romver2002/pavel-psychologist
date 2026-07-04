"use client";

import { useEffect, useRef, useState } from "react";
import { faq } from "@/lib/content";

function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () =>
      setHeight(open && innerRef.current ? innerRef.current.scrollHeight : 0);
    measure();
    if (!open) return;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  return (
    <div className="faq__item">
      {/* Вопрос — настоящий заголовок: правильная структура документа и AEO-сниппеты */}
      <h3 className="faq__q">
        <button
          type="button"
          className="faq__btn"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{q}</span>
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq__panel" id={id} style={{ height }} inert={!open}>
        <div ref={innerRef}>
          <p className="faq__answer">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section__head section__head--center">
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2>{faq.title}</h2>
        </div>
        <div className="faq">
          {faq.items.map((it, i) => (
            <FaqItem key={it.q} q={it.q} a={it.a} id={`faq-panel-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
