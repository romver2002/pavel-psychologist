import Link from "next/link";
import Reveal from "./Reveal";
import { TelegramIcon, MaxIcon, PhoneIcon, MailIcon } from "./Icons";
import { contact, siteConfig } from "@/lib/content";
import { isSet, telHref } from "@/lib/utils";

type Channel = { href: string; label: string; icon: React.ReactNode; external?: boolean; max?: boolean };

export default function Contact() {
  const channels: Channel[] = [];
  if (isSet(siteConfig.telegram))
    channels.push({ href: siteConfig.telegram, label: "Написать в Telegram", icon: <TelegramIcon className="btn__icon" />, external: true });
  if (isSet(siteConfig.max))
    channels.push({ href: siteConfig.max, label: "Написать в MAX", icon: <MaxIcon className="btn__icon" />, external: true, max: true });
  if (isSet(siteConfig.phone))
    channels.push({ href: telHref(siteConfig.phone), label: `Позвонить · ${siteConfig.phone}`, icon: <PhoneIcon className="btn__icon" /> });
  if (isSet(siteConfig.email))
    channels.push({ href: `mailto:${siteConfig.email}`, label: "Написать на почту", icon: <MailIcon className="btn__icon" /> });

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="cta">
            <span className="eyebrow eyebrow--light">{contact.eyebrow}</span>
            <h2>{contact.title}</h2>
            <p className="cta__text">{contact.text}</p>
            <div className="cta__actions">
              {channels.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={`btn ${c.max ? "btn--max" : i === 0 ? "btn--primary" : "btn--secondary"} btn--lg`}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.icon}
                  {c.label}
                </a>
              ))}
            </div>
            <p className="cta__note">
              {contact.privacyNote} Обращаясь ко мне, вы соглашаетесь с{" "}
              <Link href="/privacy/" className="cta__link">
                политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
