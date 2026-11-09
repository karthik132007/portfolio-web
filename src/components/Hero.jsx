import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useEffect, useRef, useState } from "react";
import { createSculpture } from "../lib/sculpture.js";
export default function Hero() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [changed, setChanged] = useState(false);
  const canvasRef = useRef(null);
  const sculptureRef = useRef(null);
  useEffect(() => {
    const sculpture = createSculpture(canvasRef.current);
    sculptureRef.current = sculpture;
    return () => {
      sculpture.destroy();
      sculptureRef.current = null;
    };
  }, []);
  useEffect(() => {
    sculptureRef.current?.setExpanded(expanded);
  }, [expanded]);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      {"\n"}
      <div className="hero-top mono">
        <span>
          <i className="status-dot" />
          {t(" AI & BACKEND ENGINEER")}
        </span>
        <span className="edition">{t("FIELD NOTES — VOL. 01 / 2026")}</span>
      </div>
      {"\n"}
      <div className="hero-stage">
        {"\n"}
        <div className="hero-heading">
          <h1 id="hero-title">
            {t("Curious")}
            <br />
            {t("by ")}
            <em>{t("default.")}</em>
            <span className="title-asterisk" aria-hidden="true">
              {"✳"}
            </span>
          </h1>
          <p className="hero-handnote">{t("There’s always another layer.")}</p>
        </div>
        {"\n"}
        <div className="curiosity-object">
          {"\n"}
          <span className="object-label mono">
            {t("FIG. 001 — A THOUGHT TAKING SHAPE")}
          </span>
          {"\n"}
          <div className="orb-frame">
            <canvas
              id="curiosity-canvas"
              aria-label={t(
                "An animated wireframe sculpture that opens into separate layers. Use the change perspective button to explore.",
              )}
              ref={canvasRef}
            />
            <div className="orb-cross cross-one" aria-hidden="true">
              {"+"}
            </div>
            <div className="orb-cross cross-two" aria-hidden="true">
              {"+"}
            </div>
          </div>
          {"\n"}
          <span className="object-coordinate mono" aria-hidden="true">
            {t("X: 17.0")}
            <br />
            {t("Y: ∞")}
          </span>
          {"\n"}
          <button
            id="perspective"
            className="perspective"
            aria-pressed={expanded}
            onClick={() => {
              setExpanded((open) => !open);
              setChanged(true);
            }}
          >
            <span className="perspective-icon">{"↻"}</span>
            <span>{t("Change perspective")}</span>
            <span>{"↗"}</span>
          </button>
          {"\n"}
          <span id="perspective-caption" className="sr-only" aria-live="polite">
            {!changed
              ? t("A connected system.")
              : expanded
                ? t(
                    "The layers open up. The same system, seen from a different angle.",
                  )
                : t("The layers reconnect into a single system.")}
          </span>
          {"\n"}
        </div>
        {"\n"}
      </div>
      {"\n"}
      <div className="hero-bottom">
        <div className="hero-intro">
          <span className="little-arrow" aria-hidden="true">
            {"↳"}
          </span>
          <p>
            {t("I’m Karthikeya. I follow questions down rabbit holes,")}
            <br className="desktop-break" />
            {t(" then build something useful on the way back.")}
          </p>
        </div>
        <a className="round-link" href="#work" aria-label={t("Follow the curiosity")}>
          <span>{t("Follow the curiosity")}</span>
          <span className="round-arrow" aria-hidden="true">{"↓"}</span>
        </a>
      </div>
      {"\n"}
      <div className="hero-foot mono">
        <span>{t("LESS GUESSING. MORE “LET’S FIND OUT.”")}</span>
        <span>{t("SCROLL TO EXPLORE ↓")}</span>
      </div>
      {"\n"}
    </section>
  );
}
