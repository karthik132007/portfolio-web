import { useLanguage } from "../i18n/LanguageContext.jsx";
export default function Work({ onSelectProject }) {
  const { t } = useLanguage();
  return (
    <section
      className="work section-pad"
      id="work"
      aria-labelledby="work-title"
    >
      {"\n"}
      <div className="section-kicker mono">
        <span>{t("02 / QUESTIONS MADE REAL")}</span>
        <span>{t("SELECTED BUILDS — 3 EXPLORATIONS")}</span>
      </div>
      {"\n"}
      <div className="section-title">
        <h2 id="work-title">
          {t("Show, then ")}
          <em>{t("tell.")}</em>
        </h2>
        <p>
          {t("Three different problems.")}
          <br />
          {t("The same need to understand.")}
        </p>
      </div>
      {"\n"}
      <article className="project project-featured">
        {"\n"}
        <button
          className="project-art cofounder-art"
          data-project="cofounder"
          aria-label={t("Explore AI Co-Founder case study")}
          onClick={(event) => onSelectProject("cofounder", event.currentTarget)}
        >
          {"\n"}
          <div className="art-top mono">
            <span>{t("BUILD 001 / AGENTIC SYSTEMS")}</span>
            <span className="art-tag">{t("SYSTEM STUDY")}</span>
          </div>
          {"\n"}
          <div className="cofounder-visual">
            <div className="cofounder-title">
              {t("One question.")}
              <br />
              <span>{t("Ten minds.")}</span>
            </div>
            <div className="agent-diagram" aria-hidden="true">
              <svg viewBox="0 0 460 350">
                <g className="agent-lines">
                  <path d="M230 175L80 55M230 175L230 25M230 175L380 55M230 175L435 175M230 175L380 295M230 175L230 325M230 175L80 295M230 175L25 175M230 175L135 175M230 175L325 175" />
                </g>
                <g className="agent-orbits">
                  <circle cx="230" cy="175" r="150" />
                  <ellipse cx="230" cy="175" rx="205" ry="90" />
                </g>
                <g className="agent-nodes">
                  <circle cx="80" cy="55" r="7" />
                  <circle cx="230" cy="25" r="7" />
                  <circle cx="380" cy="55" r="7" />
                  <circle cx="435" cy="175" r="7" />
                  <circle cx="380" cy="295" r="7" />
                  <circle cx="230" cy="325" r="7" />
                  <circle cx="80" cy="295" r="7" />
                  <circle cx="25" cy="175" r="7" />
                  <circle cx="135" cy="175" r="7" />
                  <circle cx="325" cy="175" r="7" />
                </g>
                <circle className="agent-core" cx="230" cy="175" r="39" />
                <text x="230" y="181" textAnchor="middle">
                  {t("CEO")}
                </text>
                <g className="agent-labels">
                  <text x="54" y="36">
                    {t("RESEARCH")}
                  </text>
                  <text x="348" y="36">
                    {t("STRATEGY")}
                  </text>
                  <text x="358" y="325">
                    {t("FINANCE")}
                  </text>
                  <text x="47" y="325">
                    {t("PRODUCT")}
                  </text>
                </g>
              </svg>
            </div>
          </div>
          {"\n"}
          <div className="art-bottom mono">
            <span>{t("10 SPECIALIST AGENTS. ONE ORCHESTRATOR.")}</span>
            <span className="art-open">{t("TAKE A LOOK ↗")}</span>
          </div>
          {"\n"}
        </button>
        {"\n"}
        <div className="project-info">
          <div>
            <span className="project-no mono">{t("01 / AI CO-FOUNDER")}</span>
            <h3>
              {t("What if a big idea")}
              <br />
              {t("had a team behind it?")}
            </h3>
          </div>
          <div className="project-description">
            <p>
              {t(
                "A multi-agent business platform that brings specialized AI agents together—and gives the conversations memory.",
              )}
            </p>
            <div className="tags">
              <span>{t("Agentic AI")}</span>
              <span>{t("Hybrid RAG")}</span>
              <span>{t("FastAPI + Kafka")}</span>
            </div>
            <button
              className="text-link"
              data-project="cofounder"
              onClick={(event) =>
                onSelectProject("cofounder", event.currentTarget)
              }
            >
              {t("Read the build notes ")}
              <span>{"↗"}</span>
            </button>
          </div>
        </div>
        {"\n"}
      </article>
      {"\n"}
      <div className="project-pair">
        {"\n"}
        <article className="project">
          <button
            className="project-art tripsync-art"
            data-project="tripsync"
            aria-label={t("Explore TripSync AI case study")}
            onClick={(event) =>
              onSelectProject("tripsync", event.currentTarget)
            }
          >
            <div className="art-top mono">
              <span>{t("BUILD 002 / RECOMMENDATIONS")}</span>
              <span>{"↗"}</span>
            </div>
            <div className="trip-map" aria-hidden="true">
              <svg viewBox="0 0 520 280">
                <defs>
                  <pattern
                    id="map-grid"
                    width="30"
                    height="30"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M30 0H0V30"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity=".12"
                    />
                  </pattern>
                </defs>
                <rect width="520" height="280" fill="url(#map-grid)" />
                <path
                  className="map-contour"
                  d="M-20 150Q80-30 180 110T380 90T560 170M-30 180Q80 0 180 140T380 120T560 200M-20 210Q80 30 180 170T380 150T560 230M-10 240Q80 60 180 200T380 180T560 260M-20 120Q80-60 180 80T380 60T560 140"
                />
                <path
                  className="map-route"
                  d="M70 200C125 200 115 80 200 105S280 230 345 140S420 85 455 55"
                />
                <circle cx="70" cy="200" r="8" />
                <circle cx="200" cy="105" r="6" />
                <circle cx="345" cy="140" r="6" />
                <circle cx="455" cy="55" r="9" />
                <text x="53" y="230">
                  {t("YOU ARE HERE")}
                </text>
                <text x="365" y="32">
                  {t("SOMEWHERE NEW")}
                </text>
              </svg>
            </div>
            <div className="trip-title">
              {t("Less searching.")}
              <br />
              <em>{t("More somewhere.")}</em>
            </div>
            <div className="art-bottom mono">
              <span>{t("TRIPSYNC AI")}</span>
              <span>{t("FIND YOUR KIND OF AWAY ↗")}</span>
            </div>
          </button>
          <div className="small-project-info">
            <span className="project-no mono">{t("02 / TRIPSYNC AI")}</span>
            <h3>
              {t("Where would your")}
              <br />
              {t("curiosity take you?")}
            </h3>
            <p>
              {t(
                "A two-tower recommendation system that turns travel preferences into destinations and day-by-day plans.",
              )}
            </p>
            <div className="tags">
              <span>{t("TensorFlow")}</span>
              <span>{t("Recommendation systems")}</span>
            </div>
            <button
              className="text-link"
              data-project="tripsync"
              onClick={(event) =>
                onSelectProject("tripsync", event.currentTarget)
              }
            >
              {t("Explore the journey ")}
              <span>{"↗"}</span>
            </button>
          </div>
        </article>
        {"\n"}
        <article className="project">
          <button
            className="project-art omnimark-art"
            data-project="omnimark"
            aria-label={t("Explore OmniMark AI case study")}
            onClick={(event) =>
              onSelectProject("omnimark", event.currentTarget)
            }
          >
            <div className="art-top mono">
              <span>{t("BUILD 003 / EXPLAINABLE AI")}</span>
              <span>{"↗"}</span>
            </div>
            <div className="answer-sheet" aria-hidden="true">
              <span className="sheet-label mono">
                {t("THE ANSWER IS MORE THAN A NUMBER.")}
              </span>
              <div className="sheet-line long" />
              <div className="sheet-line" />
              <div className="sheet-line mid" />
              <div className="sheet-line long marked" />
              <div className="sheet-line" />
              <div className="sheet-line short" />
              <span className="sheet-note">{t("Show the reasoning.")}</span>
              <span className="sheet-check">{"✓"}</span>
              <div className="sheet-stamp">
                {t("READ.")}
                <br />
                {t("REASON.")}
                <br />
                {t("EXPLAIN.")}
              </div>
            </div>
            <div className="art-bottom mono">
              <span>{t("OMNIMARK AI")}</span>
              <span>{t("LOOK BEYOND THE SCORE ↗")}</span>
            </div>
          </button>
          <div className="small-project-info">
            <span className="project-no mono">{t("03 / OMNIMARK AI")}</span>
            <h3>
              {t("Can a grade explain")}
              <br />
              {t("the “why” behind it?")}
            </h3>
            <p>
              {t(
                "An answer evaluation platform combining semantic similarity, LLMs, and asynchronous processing for explainable feedback.",
              )}
            </p>
            <div className="tags">
              <span>{t("Semantic AI")}</span>
              <span>{t("FastAPI + Celery")}</span>
            </div>
            <button
              className="text-link"
              data-project="omnimark"
              onClick={(event) =>
                onSelectProject("omnimark", event.currentTarget)
              }
            >
              {t("Look under the hood ")}
              <span>{"↗"}</span>
            </button>
          </div>
        </article>
        {"\n"}
      </div>
      {"\n"}
    </section>
  );
}
