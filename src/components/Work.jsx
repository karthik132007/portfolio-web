import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { projects } from "../data/projects.js";
import CofounderSystem from "./CofounderSystem.jsx";
import "./work.css";

const entries = Object.entries(projects);
const reelQuery = "(prefers-reduced-motion: no-preference) and (min-height: 580px)";

function useProjectReel() {
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const [enabled, setEnabled] = useState(() => window.matchMedia(reelQuery).matches);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const media = window.matchMedia(reelQuery);
    const sync = () => setEnabled(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const track = trackRef.current;
    const pin = pinRef.current;
    const last = entries.length - 1;
    let frame = 0;
    let previous = -1;
    let inset = 0;
    let travel = 0;
    let lastPosition;

    function update() {
      frame = 0;
      const distance = inset - track.getBoundingClientRect().top;
      const position = travel > 0 ? Math.min(last, Math.max(0, distance / travel * last)) : 0;
      if (position !== lastPosition) {
        track.style.setProperty("--reel-position", position.toFixed(4));
        lastPosition = position;
      }

      const nearest = Math.round(position);
      if (nearest !== previous) {
        previous = nearest;
        setActive(nearest);
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function resize() {
      inset = Number.parseFloat(getComputedStyle(pin).top) || 0;
      travel = track.offsetHeight - pin.offsetHeight;
      schedule();
    }

    resize();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      track.style.removeProperty("--reel-position");
    };
  }, [enabled]);

  return { enabled, active, trackRef, pinRef };
}

function AwardMark({ label, event, place }) {
  const { t } = useLanguage();
  return (
    <div className="work-award">
      <span className="work-award-emblem" aria-hidden="true">
        {place ?? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="m12 2 2.9 6.4 7.1.8-5.2 4.9 1.4 7-6.2-3.5-6.2 3.5 1.4-7L2 9.2l7.1-.8z"/>
          </svg>
        )}
      </span>
      <span className="work-award-copy">
        <strong>{t(label)}</strong>
        <small>{t(event)}</small>
      </span>
    </div>
  );
}

function ProjectArtwork({ projectKey }) {
  const { t } = useLanguage();

  switch (projectKey) {
    case "cofounder":
      return (
        <span className="cofounder-visual">
          <span className="cofounder-brief">
            <span className="cofounder-name mono">{t("AI Co-Founder")}</span>
            <span className="cofounder-title">
              {t("A founding team")}
              <br />
              <em>{t("that remembers.")}</em>
            </span>
          </span>
          <CofounderSystem />
        </span>
      );
    case "tripsync":
      return (
        <>
          <span className="trip-map" aria-hidden="true">
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
          </span>
          <span className="trip-title">
            {t("Less searching.")}
            <br />
            <em>{t("More somewhere.")}</em>
          </span>
        </>
      );
    case "omnimark":
      return (
        <span className="answer-sheet" aria-hidden="true">
          <span className="sheet-label mono">
            {t("THE ANSWER IS MORE THAN A NUMBER.")}
          </span>
          <span className="sheet-line long" />
          <span className="sheet-line" />
          <span className="sheet-line mid" />
          <span className="sheet-line long marked" />
          <span className="sheet-line" />
          <span className="sheet-line short" />
          <span className="sheet-note">{t("Show the reasoning.")}</span>
          <span className="sheet-check">{"✓"}</span>
          <span className="sheet-stamp">
            {t("READ.")}
            <br />
            {t("REASON.")}
            <br />
            {t("EXPLAIN.")}
          </span>
        </span>
      );
    case "sherlock":
      return (
        <>
          <img
            className="sherlock-graph"
            src={`${import.meta.env.BASE_URL}assets/projects/sherlock.svg`}
            alt=""
            loading="lazy"
          />
          <span className="sherlock-title">
            {t("Every connection.")}
            <br />
            <em>{t("Back to the source.")}</em>
          </span>
        </>
      );
  }
}

function ProjectFace({ projectKey, project, index, enabled, current, onSelectProject }) {
  const { t } = useLanguage();

  return (
    <article
      className={`reel-face reel-face--${projectKey}`}
      id={enabled ? undefined : `project-${projectKey}`}
      style={{ "--face-index": index }}
      inert={enabled && !current}
      aria-hidden={enabled && !current ? true : undefined}
    >
      {projectKey === "cofounder" && (
        <span id="cofounder-illustration-description" className="sr-only">
          {t("The CEO agent receives the founder’s brief, retrieves context from company documents and past conversations, and routes work to specialists. The founder sees the reply and agent activity as they stream.")}
        </span>
      )}
      <button
        type="button"
        className="reel-cover"
        aria-haspopup="dialog"
        aria-controls="project-dialog"
        aria-label={t("Read the {project} case study", { project: t(project.title) })}
        aria-describedby={projectKey === "cofounder" ? "cofounder-illustration-description" : undefined}
        onClick={(event) => onSelectProject(projectKey, event.currentTarget)}
      >
        <span className={`project-art ${projectKey}-art`}>
          <ProjectArtwork projectKey={projectKey} />
        </span>
        <span className="reel-cover-caption">
          <span>{t(project.title)}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </button>
      {project.award && <AwardMark {...project.award} />}
      {!enabled && <p className="reel-static-summary">{t(project.summary)}</p>}
    </article>
  );
}

export default function Work({ onSelectProject }) {
  const { t } = useLanguage();
  const { enabled, active, trackRef, pinRef } = useProjectReel();
  const [key, project] = entries[active];
  const number = String(active + 1).padStart(2, "0");

  return (
    <section className="work section-pad" id="work" aria-labelledby="work-title">
      <div className="section-kicker work-kicker mono">
        <span>{t("02 / QUESTIONS MADE REAL")}</span>
        <span>{t("SELECTED BUILDS — {count} EXPLORATIONS", { count: entries.length })}</span>
      </div>
      <div className="section-title work-heading">
        <h2 id="work-title">{t("My ")}<em>{t("work")}</em></h2>
        {enabled && <p>{t("Scroll to turn the reel.")}</p>}
      </div>
      <div
        ref={trackRef}
        className={enabled ? "work-reel" : "work-reel work-reel--still"}
        style={{ "--reel-steps": entries.length - 1 }}
      >
        {enabled && entries.map(([projectKey], index) => (
          <span
            key={projectKey}
            id={`project-${projectKey}`}
            className="reel-stop"
            style={{ "--face-index": index }}
            aria-hidden="true"
          />
        ))}
        <div className="reel-pin" ref={pinRef}>
          {enabled && (
            <div className="reel-sidebar">
              <nav className="reel-index mono" aria-label={t("Project index")}>
                {entries.map(([projectKey, item], index) => (
                  <a
                    key={projectKey}
                    href={`#project-${projectKey}`}
                    aria-current={index === active ? "true" : undefined}
                    aria-label={t(item.title)}
                    title={t(item.title)}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </a>
                ))}
              </nav>
              <div className="reel-details">
                <p className="reel-count mono">
                  <span>{number} / {String(entries.length).padStart(2, "0")}</span>
                  <span>{t(project.category)}</span>
                </p>
                <h3>{t(project.title)}</h3>
                <p className="reel-summary">{t(project.summary)}</p>
                <ul className="reel-stack mono" aria-label={t("Technology stack")}>
                  {project.stack.map((tool) => <li key={tool}>{t(tool)}</li>)}
                </ul>
                <button
                  className="text-link"
                  type="button"
                  aria-haspopup="dialog"
                  aria-controls="project-dialog"
                  aria-label={t("Read the {project} case study", { project: t(project.title) })}
                  onClick={(event) => onSelectProject(key, event.currentTarget)}
                >
                  {t("Read the case study")} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          )}
          <div className="reel-stage">
            <div className="reel-wheel">
              {entries.map(([projectKey, item], index) => (
                <ProjectFace
                  key={projectKey}
                  projectKey={projectKey}
                  project={item}
                  index={index}
                  enabled={enabled}
                  current={index === active}
                  onSelectProject={onSelectProject}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
