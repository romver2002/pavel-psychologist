"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, siteConfig } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1101px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  // Блокируем прокрутку фона при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`.trim()}>
      <div className="container header__inner">
        <Link href="/#top" className="brand" aria-label={`${siteConfig.brand} — на главную`}>
          {siteConfig.brand}
        </Link>

        <nav className="nav" aria-label="Основная навигация">
          <ul id="nav-menu" className={`nav__links ${open ? "is-open" : ""}`.trim()}>
            {nav.map((item) => (
              <li key={item.anchor}>
                <Link className="nav__link" href={item.anchor} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="btn btn--primary btn--header"
            onClick={() => setOpen(false)}
          >
            Записаться
          </Link>

          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
