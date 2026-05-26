import type { Project, Experience } from "@/types";

const CACHE_KEY = "jg_tr_v1";

function getCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setCache(key: string, value: string): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...getCache(), [key]: value }));
  } catch {}
}

async function autoTranslate(text: string, lang: "en" | "es"): Promise<string> {
  if (!text?.trim()) return text;
  const cacheKey = `${lang}:${text}`;
  const hit = getCache()[cacheKey];
  if (hit) return hit;
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const json = await res.json();
    const translated = (json[0] as [string][]).map((x) => x[0]).join("");
    setCache(cacheKey, translated);
    return translated;
  } catch {
    return text;
  }
}

export async function translateProject(p: Project, lang: "en" | "es"): Promise<Project> {
  const [description, role, ...learnings] = await Promise.all([
    autoTranslate(p.description, lang),
    autoTranslate(p.role, lang),
    ...p.learnings.map((l) => autoTranslate(l, lang)),
  ]);
  return { ...p, description, role, learnings };
}

export async function translateExperience(e: Experience, lang: "en" | "es"): Promise<Experience> {
  const [title, description, ...achievements] = await Promise.all([
    autoTranslate(e.title, lang),
    autoTranslate(e.description, lang),
    ...e.achievements.map((a) => autoTranslate(a, lang)),
  ]);
  return { ...e, title, description, achievements };
}
