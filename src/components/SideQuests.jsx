import { useLanguage } from "../i18n/LanguageContext.jsx";
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
        <div className="off-duty-heading">
          <span className="mono">
            {t("SIDE QUESTS / NO TERMINAL REQUIRED")}
          </span>
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
          <aside className="future-note" aria-labelledby="future-title">
            <span className="mono">{t("QUEST LOG / WHAT COMES NEXT")}</span>
            <svg className="quest-star" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#pixel-star" />
            </svg>
            <h3 id="future-title">
              {t("From building AI")}
              <br />
              {t("to ")}
              <em>{t("researching it.")}</em>
            </h3>
            <p>
              {t(
                "I want to become an AI researcher. Here’s the path I’m aiming for.",
              )}
            </p>
            <ol className="quest-path">
              <li className="quest-current">
                <span className="quest-node" aria-hidden="true" />
                <div>
                  <span className="mono">{t("IN PROGRESS / 2024–2028")}</span>
                  <h4>{t("B.Tech in AI & ML")}</h4>
                  <p>{t("Aditya University")}</p>
                </div>
              </li>
              <li>
                <span className="quest-node" aria-hidden="true" />
                <div>
                  <span className="mono">{t("NEXT CHAPTER / THE GOAL")}</span>
                  <h4>{t("Master’s in AI")}</h4>
                  <p>{t("Germany or Japan")}</p>
                </div>
              </li>
              <li>
                <span className="quest-node" aria-hidden="true" />
                <div>
                  <span className="mono">{t("THE LONG GAME / IF FUNDED")}</span>
                  <h4>{t("A PhD. Deeper questions.")}</h4>
                  <p>{t("A funded research opportunity, if possible.")}</p>
                </div>
              </li>
            </ol>
            <p className="future-footnote">
              {t("A direction I’m working toward.")}
              <br />
              {t("Still plenty to discover on the way.")}
            </p>
          </aside>
        </div>
        {"\n"}
      </div>
    </section>
  );
}
