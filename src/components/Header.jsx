import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
export default function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="header">
        <a
          className="identity"
          href="#top"
          aria-label={t("Karthikeya Kumar, back to top")}
        >
          <span className="monogram">
            {t("k")}
            <span>↗</span>
          </span>
          <span>
            {t("Karthikeya")}
            <br />
            {t("Kumar")}
            <span className="identity-dot">.</span>
          </span>
        </a>
        <nav aria-label={t("Main navigation")}>
          <a href="#inventory">
            {t("The toolkit ")}
            <span>01</span>
          </a>
          <a href="#work">
            {t("The work ")}
            <span>02</span>
          </a>
          <a href="#about">
            {t("The person ")}
            <span>03</span>
          </a>
          <a className="nav-contact" href="#contact">
            {t("Let's talk ")}
            <span>↗</span>
          </a>
        </nav>
        <div className="header-controls">
          <LanguageSwitcher />
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {t("Menu ")}
            <span>{menuOpen ? "−" : "+"}</span>
          </button>
        </div>
      </header>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label={t("Mobile navigation")}
        hidden={!menuOpen}
      >
        <a href="#inventory" onClick={() => setMenuOpen(false)}>
          {t("01 / The toolkit")}
        </a>
        <a href="#work" onClick={() => setMenuOpen(false)}>
          {t("02 / The work")}
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          {t("03 / The person")}
        </a>
        <a href="#side-quests" onClick={() => setMenuOpen(false)}>
          {t("04 / Side quests")}
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          {t("05 / Let's talk ↗")}
        </a>
      </nav>
    </>
  );
}
