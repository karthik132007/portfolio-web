import { useLanguage } from "../i18n/LanguageContext.jsx";
export default function Opening() {
  const { t } = useLanguage();
  return (
    <section className="opening section-pad" aria-labelledby="opening-title">
      {"\n"}
      <div className="section-kicker mono">
        <span>{t("00 / THE STARTING POINT")}</span>
        <span>{t("EVERY BUILD BEGINS WITH A QUESTION")}</span>
      </div>
      {"\n"}
      <div className="opening-grid">
        <span className="big-asterisk" aria-hidden="true">
          {"✳"}
        </span>
        <div>
          <h2 id="opening-title">
            {t("“How does this work?”")}
            <br />
            {t("usually turns into")}
            <br />
            <em>{t("“What if it worked better?”")}</em>
          </h2>
          <div className="opening-copy">
            <p>
              {t(
                "That’s the loop I like living in. Understand the moving parts. Question the obvious answer. Build, break, learn, repeat.",
              )}
            </p>
            <p>
              {t(
                "Right now, that takes me somewhere between intelligent systems and the backend engineering that makes them useful.",
              )}
            </p>
          </div>
        </div>
      </div>
      {"\n"}
    </section>
  );
}
