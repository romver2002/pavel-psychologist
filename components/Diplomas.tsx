"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Placeholder from "./Placeholder";
import { DocIcon, CloseIcon, ZoomIcon } from "./Icons";
import { diplomas } from "@/lib/content";
import { assetPath } from "@/lib/utils";

type Item = (typeof diplomas.items)[number];

export default function Diplomas() {
  const [active, setActive] = useState<Item | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Нативный <dialog>: showModal даёт затемнение, фокус-ловушку и закрытие по Esc
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  return (
    <section id="diplomas" className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">{diplomas.eyebrow}</span>
          <h2>{diplomas.title}</h2>
          <p className="lead">{diplomas.intro}</p>
        </div>
        <div className="grid grid--diplomas">
          {diplomas.items.map((d, i) => (
            <Reveal key={`${d.title}-${i}`} delay={(i % 4) * 60}>
              <figure className="diploma">
                {d.image ? (
                  <button
                    type="button"
                    className="diploma__zoom"
                    onClick={() => setActive(d)}
                    aria-label={`${d.title} — открыть в полном размере`}
                  >
                    {/* Статический экспорт: next/image не оптимизирует, поэтому <img>
                        с явными размерами (без сдвига макета) — осознанный выбор. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="diploma__frame"
                      src={assetPath(d.image)}
                      alt={`${d.title} — ${d.subtitle}`}
                      width={d.width}
                      height={d.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ) : (
                  <Placeholder
                    className="diploma__frame"
                    label="Документ появится позже"
                    icon={<DocIcon className="placeholder__icon" />}
                  />
                )}
                <figcaption className="diploma__caption">
                  <div className="diploma__title">{d.title}</div>
                  <div className="diploma__sub">{d.subtitle}</div>
                  {d.image && (
                    <span className="diploma__hint">
                      <ZoomIcon className="btn__icon" /> Нажмите, чтобы рассмотреть
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={active ? `${active.title} — просмотр документа` : undefined}
        onClose={() => setActive(null)}
        onClick={(e) => {
          // клик по подложке (сам <dialog>) закрывает просмотр
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {active && (
          <>
            <button
              type="button"
              className="lightbox__close"
              onClick={() => setActive(null)}
              aria-label="Закрыть просмотр"
            >
              <CloseIcon />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lightbox__img"
              src={assetPath(active.image)}
              alt={`${active.title} — ${active.subtitle}`}
              width={active.width}
              height={active.height}
            />
            <p className="lightbox__caption">
              {active.title} · {active.subtitle}
            </p>
          </>
        )}
      </dialog>
    </section>
  );
}
