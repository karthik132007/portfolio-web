import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./i18n/LanguageContext.jsx";
import LanguageGate from "./components/LanguageGate.jsx";
import useScrollMotion from "./hooks/useScrollMotion.js";
import IconSprite from "./components/IconSprite.jsx";
import ReadingProgress from "./components/ReadingProgress.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Opening from "./components/Opening.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import SideQuests from "./components/SideQuests.jsx";
import Inventory from "./components/Inventory.jsx";
import Contact from "./components/Contact.jsx";
import ProjectDialog from "./components/ProjectDialog.jsx";

export default function App() {
  const { voice } = useLanguage();
  return voice ? <Portfolio /> : <LanguageGate />;
}

function Portfolio() {
  const { t } = useLanguage();
  const [selection, setSelection] = useState(null);
  const mainRef = useRef(null);
  useScrollMotion(mainRef);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
      const target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      );
      if (target) target.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <IconSprite />
      <a className="skip" href="#main">
        {t("Skip to content")}
      </a>
      <ReadingProgress />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Hero />
        <Opening />
        <Inventory />
        <Work
          onSelectProject={(key, trigger) => setSelection({ key, trigger })}
        />
        <About />
        <SideQuests />
        <Contact />
      </main>
      <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
    </>
  );
}
