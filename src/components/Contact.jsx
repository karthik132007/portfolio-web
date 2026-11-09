import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useState } from "react";
export default function Contact() {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    const email = "karthikeya2k7@zohomail.in";
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus(email);
    }
  }
  return (
    <section
      className="contact section-pad"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section-kicker mono">
        <span>{t("05 / THE NEXT GOOD QUESTION")}</span>
        <span>
          <i className="status-dot" />
          {t(" START A CONVERSATION")}
        </span>
      </div>
      <div className="contact-main">
        <div>
          <p className="contact-pre">
            {t("An interesting problem? A half-formed idea?")}
          </p>
          <h2 id="contact-title">
            {t("Let’s find")}
            <br />
            <em>{t("out.")}</em>
            <span aria-hidden="true">{"↗"}</span>
          </h2>
        </div>
        <div className="contact-action">
          <p>
            {t("The best part of building is finding")}
            <br />
            {t("people who ask different questions.")}
          </p>
          <a href="mailto:karthikeya2k7@zohomail.in" className="email-link">
            {t("Say hello ")}
            <span>{"↗"}</span>
          </a>
          <button
            className="copy-email mono"
            id="copy-email"
            onClick={copyEmail}
          >
            {t("COPY EMAIL ADDRESS ")}
            <span>{"⧉"}</span>
          </button>
          <span id="copy-status" className="copy-status" role="status">
            {copyStatus === "copied" ? t("Copied. Your move ↗") : copyStatus}
          </span>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="footer-name" href="#top">
          {t("Karthikeya Kumar ")}
          <span>{"✳"}</span>
        </a>
        <div className="footer-socials">
          <a
            href="https://github.com/karthik132007"
            target="_blank"
            rel="noopener"
          >
            {t("GitHub ↗")}
          </a>
          <a
            href="https://linkedin.com/in/karthikeya2k7"
            target="_blank"
            rel="noopener"
          >
            {t("LinkedIn ↗")}
          </a>
          <a href="assets/Karthikeya_SDE.pdf" target="_blank" rel="noopener">
            {t("Resume ↗")}
          </a>
        </div>
        <span className="footer-note mono">
          {t("© 2026 KARTHIKEYA KUMAR")}
        </span>
      </div>
      <p className="footer-credit">
        {t("Like the site? Kudos to @codex. The coffee wants partial credit.")}
      </p>
    </footer>
  );
}
