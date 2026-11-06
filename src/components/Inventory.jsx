import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useEffect, useRef, useState } from "react";
import { groups, items } from "../data/inventory.js";
import ChestArtwork from "./ChestArtwork.jsx";
import TechnologyIcon from "./TechnologyIcon.jsx";
const clamp = (value) => Math.max(0, Math.min(1, value));
export default function Inventory() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const firstItemRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const [selected, setSelected] = useState(0);
  const progress = manuallyOpened ? 1 : scrollProgress;
  const opened = progress > 0.82;
  const item = items[selected];
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const rect = sectionRef.current.getBoundingClientRect();
      const distance = Math.min(330, window.innerHeight * 0.44);
      const next = clamp((30 - rect.top) / distance);
      setScrollProgress(motion.matches ? (next > 0.2 ? 1 : 0) : next);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    window.addEventListener("resize", onScroll);
    motion.addEventListener("change", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onScroll);
    };
  }, []);
  function openChest() {
    setManuallyOpened(true);
    requestAnimationFrame(() =>
      firstItemRef.current?.focus({
        preventScroll: true,
      }),
    );
  }
  return (
    <section
      ref={sectionRef}
      className="inventory section-pad minecraft-inventory"
      id="inventory"
      aria-labelledby="inventory-title"
    >
      <div className="chest-sticky-scene">
        <div className="section-kicker mono">
          <span>{t("01 / THE TOOL COLLECTION")}</span>
        </div>
        <div className="inventory-heading">
          <div>
            <h2 id="inventory-title">
              {t("My working ")}
              <em>{t("inventory.")}</em>
            </h2>
            <p>{t("A few things I’ve picked up along the way.")}</p>
          </div>
          <span className="chest-scroll-note mono" aria-hidden="true">
            {opened ? t("PICK SOMETHING UP ↗") : t("SCROLL TO OPEN ↓")}
          </span>
        </div>
        <div className="chest-layout">
          <div
            className={`double-chest${opened ? " is-open" : ""}`}
            style={{
              "--chest-progress": progress,
              "--items-opacity": clamp((progress - 0.48) / 0.34),
            }}
          >
            <ChestArtwork progress={progress} />
            <button
              className="chest-open-target"
              onClick={openChest}
              aria-label={t("Open tool chest")}
              aria-controls="inventory-grid"
              aria-expanded={opened}
              tabIndex={opened ? -1 : 0}
            />
            <div
              className="chest-contents"
              inert={!opened}
              aria-hidden={!opened}
            >
              <div className="chest-inventory-label">
                <span>{t("Large Chest")}</span>
                <span>{t("{count} items", { count: items.length })}</span>
              </div>
              <div
                className="inventory-grid chest-grid"
                id="inventory-grid"
                role="group"
                aria-label={t("Tools in the double chest")}
              >
                {items.map((tool, index) => (
                  <button
                    key={tool.name}
                    ref={index === 0 ? firstItemRef : null}
                    type="button"
                    className={`inventory-slot chest-slot${tool.category === "foundations" ? " enchanted" : ""}${selected === index ? " selected" : ""}`}
                    aria-label={t("Inspect {name}", { name: t(tool.name) })}
                    aria-pressed={selected === index}
                    onClick={() => setSelected(index)}
                  >
                    <TechnologyIcon item={tool} />
                    <span className="chest-item-name">{t(tool.name)}</span>
                  </button>
                ))}
                <span className="chest-slot empty-slot" aria-hidden="true" />
              </div>
            </div>
            <span className="chest-ground-note mono">
              {opened
                ? t("YOUR NEXT BUILD STARTS HERE.")
                : t("THERE’S A LITTLE CURIOSITY IN EVERY SLOT.")}
            </span>
          </div>
          <aside className="item-inspector" aria-labelledby="item-name">
            <div className="inspector-top mono">
              <span>{t("ITEM INSPECTOR")}</span>
              <span id="item-slot-number">
                {t("SLOT {number}", {
                  number: String(selected + 1).padStart(2, "0"),
                })}
              </span>
            </div>
            <div
              className="inspector-icon"
              id="inspector-icon"
              aria-hidden="true"
            >
              <TechnologyIcon item={item} />
            </div>
            <div id="item-details" aria-live="polite" aria-atomic="true">
              <span id="item-category" className="item-category mono">
                {t(groups[item.category]).toUpperCase() +
                  (item.category === "foundations" ? t(" / ENCHANTMENT") : "")}
              </span>
              <h3 id="item-name">{t(item.name)}</h3>
              <p id="item-description">{t(item.description)}</p>
            </div>
            <div className="inspector-bottom">
              <span className="mono">{t("EQUIPPED WITH")}</span>
              <span>{t("Curiosity. No level cap.")}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
