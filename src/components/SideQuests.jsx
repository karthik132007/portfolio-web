import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./quest-log.css";

export default function SideQuests() {
  const { t } = useLanguage();
  return (
    <section
      className="side-quests section-pad"
      id="side-quests"
      aria-labelledby="off-duty-title"
    >
      <div className="off-duty" aria-labelledby="off-duty-title">
        {"\n"}
        <div className="section-kicker mono">
          <span>{t("SIDE QUESTS / NO TERMINAL REQUIRED")}</span>
        </div>
        <div className="off-duty-heading">
          <h2 id="off-duty-title">
            {t("A little less résumé.")}
            <br />
            <em>{t("A little more me.")}</em>
          </h2>
        </div>
        {"\n"}
        <div className="personal-layout">
          <div className="fun-facts">
            {"\n"}
            <article className="fun-fact">
              <span className="fact-icon fact-grass" aria-hidden="true">
                <img
                  className="hobby-icon"
                  src="assets/hobby-icons/minecraft.svg"
                  width="32"
                  height="32"
                  alt=""
                  draggable={false}
                />
              </span>
              <div>
                <span className="mono">{t("01 / THE BLOCK OBSESSION")}</span>
                <h4>{t("“One more block” is never one more block.")}</h4>
                <p>
                  {t(
                    "I love Minecraft enough to have ignored semester exams for it. Not my finest time-management moment.",
                  )}
                </p>
                <details className="launcher-note">
                  <summary>
                    {t("The launcher rabbit hole ")}
                    <span>{"+"}</span>
                  </summary>
                  <p>
                    {t(
                      "I also built a custom launcher tool that bypassed Microsoft authentication to play for free. Curiosity went a little further than the game.",
                    )}
                  </p>
                </details>
              </div>
            </article>
            {"\n"}
            <article className="fun-fact">
              <span className="fact-icon fact-bowl" aria-hidden="true">
                <img
                  className="hobby-icon"
                  src="assets/hobby-icons/cooking.svg"
                  width="32"
                  height="32"
                  alt=""
                  draggable={false}
                />
              </span>
              <div>
                <span className="mono">{t("02 / AWAY FROM THE KEYBOARD")}</span>
                <h4>{t("South Indian roots. An international kitchen.")}</h4>
                <p>
                  {t(
                    "I’m vegetarian, and I love cooking North Indian, Chinese, and Italian food. There’s a lot to explore beyond the food I grew up with.",
                  )}
                </p>
                <div className="food-labels">
                  <span>{t("North Indian")}</span>
                  <span>{t("Chinese")}</span>
                  <span>{t("Italian")}</span>
                  <span className="veg-label">{t("100% vegetarian")}</span>
                </div>
              </div>
            </article>
            {"\n"}
            <article className="fun-fact">
              <span className="fact-icon fact-chat" aria-hidden="true">
                <img
                  className="hobby-icon"
                  src="assets/hobby-icons/reactions.svg"
                  width="32"
                  height="32"
                  alt=""
                  draggable={false}
                />
              </span>
              <div>
                <span className="mono">{t("03 / FRIEND-GROUP LORE")}</span>
                <h4>{t("Occasional ragebait. Frequent reactions.")}</h4>
                <p>
                  {t(
                    "I like ragebaiting my friends. Consider this fair warning before you add me to the group chat.",
                  )}
                </p>
              </div>
            </article>
            {"\n"}
            <article className="fun-fact">
              <span className="fact-icon fact-arch" aria-hidden="true">
                <img
                  className="hobby-icon"
                  src="assets/hobby-icons/archlinux.svg"
                  width="32"
                  height="32"
                  alt=""
                  draggable={false}
                />
              </span>
              <div>
                <span className="mono">{t("04 / THE OBLIGATORY MENTION")}</span>
                <h4>{t("I use Arch btw.")}</h4>
                <p>{t("Yes, it had to make it into the portfolio.")}</p>
              </div>
            </article>
          </div>
          <aside className="quest-log" aria-labelledby="future-title">
            <header className="quest-log-header">
              <img
                className="quest-log-landscape"
                src="assets/research-roadmap.svg"
                width="620"
                height="324"
                alt=""
              />
              <p className="quest-log-kicker mono">{t("ROADMAP / FUTURE PLANS")}</p>
              <h3 id="future-title">
                {t("The Path to ")}
                <em>{t("AI Research")}</em>
              </h3>
              <p className="quest-log-intro">
                {t("A long-term plan to build strong foundations, explore deeper questions, and contribute to meaningful research in AI.")}
              </p>
            </header>
            <div className="quest-log-route">
              <svg className="quest-log-rail" viewBox="0 0 40 300" preserveAspectRatio="none" aria-hidden="true">
                <path d="M39 0C21 12 25 35 25 50c0 28-25 47-25 67 0 15 14 24 25 33 11 22-21 46-21 69 0 11 7 21 21 31" />
              </svg>
              <ol className="quest-log-milestones" role="list">
                <li>
                  <div className="quest-log-card">
                    <span className="mono">{t("PHASE 01 / 2024–2028")}</span>
                    <h4>{t("B.Tech in AI & ML")}</h4>
                    <p>{t("Aditya University")}</p>
                  </div>
                </li>
                <li>
                  <div className="quest-log-card">
                    <span className="mono">{t("PHASE 02 / NEXT")}</span>
                    <h4>{t("Master’s in AI")}</h4>
                    <p>{t("Germany or Japan")}</p>
                  </div>
                </li>
                <li>
                  <div className="quest-log-card">
                    <span className="mono">{t("PHASE 03 / LONG TERM")}</span>
                    <h4>{t("A PhD / Deeper Research")}</h4>
                    <p>{t("A funded research opportunity, if possible.")}</p>
                  </div>
                </li>
              </ol>
            </div>
            <p className="quest-log-note">
              <span className="quest-log-divider" aria-hidden="true">✦</span>
              {t("Build → Explore → Research")}
            </p>
          </aside>
        </div>
        {"\n"}
      </div>
    </section>
  );
}
