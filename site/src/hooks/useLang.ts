import { useState, useEffect, useCallback } from "react";
import type { Lang } from "@/types";

const VALID_LANGS: Lang[] = ["pt", "en", "es"];

export function useLang() {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && VALID_LANGS.includes(saved)) setLang(saved);
  }, []);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  }, []);

  return { lang, changeLang };
}
