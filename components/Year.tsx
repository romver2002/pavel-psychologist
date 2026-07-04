"use client";

import { useEffect, useState } from "react";

/** Текущий год на стороне клиента — чтобы © не «замерзал» на дате сборки статики. */
export default function Year({ fallback }: { fallback: number }) {
  const [year, setYear] = useState(fallback);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
