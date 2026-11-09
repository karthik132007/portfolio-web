import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./opening.css";

function OpeningFigure({ type }) {
  return (
    <svg className="opening-figure" viewBox="0 0 132 84" aria-hidden="true">
      <path className="opening-figure-guides" d="M3 17V4h13m100 0h13v13m0 50v13h-13M16 80H3V67M66 6v72M5 42h122" />
      {type === "ranking" ? (
        <>
          <path className="opening-figure-lines" d="M18 61h96M53 35h26m-5-5 5 5-5 5" />
          <path className="opening-figure-ink" d="M22 24h5v30h-5zm9 7h5v23h-5zm9 7h5v16h-5zm51-8h6v24h-6zm11 12h6v12h-6z" />
        </>
      ) : (
        <>
          <path className="opening-figure-lines" d="M43 42h49M65 42V23h27M65 42v19h27" />
          <rect className="opening-figure-ink" x="20" y="33" width="23" height="18" rx="2" />
          <path className="opening-figure-cutout" d="m27 39 4 3-4 3m7 0h4" />
          <path className="opening-figure-ink" d="M92 18h20v10H92zm0 19h20v10H92zm0 19h20v10H92z" />
          <circle className="opening-figure-node" cx="65" cy="42" r="5" />
        </>
      )}
    </svg>
  );
}

export default function Opening() {
  const { t } = useLanguage();
  const routes = [
    {
      figure: "ranking",
      title: t("AI engineering"),
      description: t("Agent workflows, hybrid retrieval, recommendation models, and how I evaluate them."),
      resume: t("AI résumé"),
      resumeFile: "Karthikeya_AIE.pdf",
    },
    {
      figure: "backend",
      title: t("Backend engineering"),
      description: t("Python APIs, event-driven workers, caching, and tracing for live services."),
      resume: t("Backend résumé"),
      resumeFile: "Karthikeya_SDE.pdf",
    },
  ];

  return (
    <section className="opening section-pad" id="starting-point" aria-labelledby="opening-title">
      <div className="section-kicker opening-kicker mono">
        <span>{t("00 / THE STARTING POINT")}</span>
      </div>
      <div className="opening-intro">
        <h2 id="opening-title">{t("In ")}<em>{t("brief.")}</em></h2>
        <p>{t("I work on retrieval and ranking, and on the backend services that run them.")}</p>
      </div>
      <div className="opening-index">
        {routes.map(({ figure, title, description, resume, resumeFile }, index) => (
          <a
            className="opening-entry"
            href={`${import.meta.env.BASE_URL}assets/${resumeFile}`}
            target="_blank"
            rel="noopener"
            aria-label={t("{resume} ({format})", { resume, format: t("PDF") })}
            key={resumeFile}
          >
            <span className="opening-entry-meta mono">
              <span aria-hidden="true">{index === 0 ? "A" : "B"}</span>
              {resume} · {t("PDF")}
            </span>
            <OpeningFigure type={figure} />
            <h3>{title} <span aria-hidden="true">↗</span></h3>
            <p>{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
