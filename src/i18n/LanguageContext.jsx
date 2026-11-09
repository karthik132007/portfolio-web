import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isVoice, translate } from "./translate.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [voice, setVoice] = useState(null);
  const chooseVoice = useCallback((next) => {
    if (!isVoice(next)) return;
    setVoice(next);
  }, []);
  const t = useCallback(
    (source, values) => translate(source, voice || "standard", values),
    [voice],
  );

  useEffect(() => {
    document.documentElement.dataset.languageStyle = voice || "standard";
    document.title = voice
      ? t("Karthikeya Kumar — Curious by default.")
      : "Karthikeya Kumar — Choose your English";
    const descriptions = [
      [
        'meta[name="description"]',
        t("Karthikeya Kumar — AI & backend engineer. A field guide to the questions, experiments, and systems behind my work."),
      ],
      ['meta[property="og:title"]', t("Karthikeya Kumar — Curious by default.")],
      [
        'meta[property="og:description"]',
        t("A question is a pretty good place to start. Explore my work in agentic AI, recommendation systems, and backend engineering."),
      ],
    ];
    descriptions.forEach(([selector, content]) =>
      document.querySelector(selector)?.setAttribute("content", content),
    );
  }, [voice, t]);

  const value = useMemo(
    () => ({ voice, chooseVoice, t }),
    [voice, chooseVoice, t],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is missing");
  return context;
}
