import { useLanguage } from "../i18n/LanguageContext.jsx";
import { voices } from "../i18n/translate.js";

export default function LanguageSwitcher() {
  const { voice, chooseVoice, t } = useLanguage();
  return (
    <label className="language-switcher">
      <span className="mono">{t("Language")}</span>
      <select
        aria-label={t("Language style")}
        value={voice}
        onChange={(event) => chooseVoice(event.target.value)}
      >
        {voices.map((option) => (
          <option value={option.id} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
