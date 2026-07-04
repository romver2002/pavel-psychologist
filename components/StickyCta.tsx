import Link from "next/link";

/** Липкая кнопка записи — видна только на мобильных (см. globals.css). */
export default function StickyCta() {
  return (
    <Link href="/#contact" className="btn btn--primary sticky-cta">
      Записаться на консультацию
    </Link>
  );
}
