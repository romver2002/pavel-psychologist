"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function Disciplines({
  items,
  openText,
  closedText,
}: {
  items: string[];
  openText?: string;
  closedText?: string;
}) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const panelId = useId();

  useEffect(() => {
    const measure = () =>
      setHeight(open && innerRef.current ? innerRef.current.scrollHeight : 0);
    measure();
    if (!open) return;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  return (
    <div className="disclosure">
      <button
        type="button"
        className="disclosure__btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {open
            ? openText ?? "Скрыть дисциплины"
            : closedText ?? `Показать все дисциплины (${items.length})`}
        </span>
        <span className="disclosure__icon" aria-hidden="true" />
      </button>
      <div className="disclosure__panel" id={panelId} style={{ height }} inert={!open}>
        <div className="disclosure__inner" ref={innerRef}>
          <ul className="disciplines">
            {items.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
