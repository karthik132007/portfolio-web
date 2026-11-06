import { useLanguage } from "../i18n/LanguageContext.jsx";
export default function About() {
  const { t } = useLanguage();
  return (
    <section
      className="about section-pad"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-kicker mono">
        <span>{t("03 / THE PERSON BEHIND THE BUILDS")}</span>
        <span>{t("STILL LEARNING. ALWAYS WILL BE.")}</span>
      </div>
      <div className="about-layout">
        <div className="about-statement">
          <h2 id="about-title">
            {t("A work in")}
            <br />
            <em>{t("progress.")}</em>
            <span>{t("And proud of it.")}</span>
          </h2>
          <div className="profile-note">
            <span className="note-pin" aria-hidden="true" />
            <span className="mono">{t("A FEW THINGS ABOUT ME")}</span>
            <p>
              {t("I like the moment")}
              <br />
              {t("something complicated")}
              <br />
              <em>{t("finally clicks.")}</em>
            </p>
            <span className="note-signature">{t("— Karthikeya")}</span>
          </div>
        </div>
        <div className="about-details">
          <p className="about-lead">
            {t(
              "I’m Karthikeya Kumar, an AI & backend engineer studying how to make intelligent software work in the real world.",
            )}
          </p>
          <p>
            {t(
              "I’m pursuing a B.Tech in Artificial Intelligence & Machine Learning at Aditya University (2024–2028). My projects bring together agents, retrieval, recommendation models, and the systems that connect them.",
            )}
          </p>
          <p>
            {t(
              "I’m drawn to the parts you don’t see: how context gets retrieved, how jobs recover, how a response gets faster. Understanding those details is usually where the next idea begins.",
            )}
          </p>
          <div className="timeline">
            <div>
              <span className="mono">{"2025"}</span>
              <div>
                <h3>{t("Learning from messy data.")}</h3>
                <p>
                  {t("Data Analysis Intern · SkillFied Mentor")}
                  <br />
                  {t(
                    "SQL and Python validation workflows across 10,000+ records.",
                  )}
                </p>
              </div>
            </div>
            <div>
              <span className="mono">{t("1ST")}</span>
              <div>
                <h3>{t("Building something that connected.")}</h3>
                <p>
                  {t("TechnicalHub Project Space 8.0")}
                  <br />
                  {t(
                    "First prize for the automated paper evaluation platform.",
                  )}
                </p>
              </div>
            </div>
            <div>
              <span className="mono">{"2026"}</span>
              <div>
                <h3>{t("Following a different thread.")}</h3>
                <p>
                  {t("Top 10 · VIT GDG DevJam")}
                  <br />
                  {t(
                    "Sherlock: unstructured text into interactive knowledge graphs.",
                  )}
                </p>
              </div>
            </div>
          </div>
          <a
            href="assets/Karthikeya_AIE.pdf"
            className="text-link"
            target="_blank"
            rel="noopener"
          >
            {t("The one-page version ")}
            <span>{"↓"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
