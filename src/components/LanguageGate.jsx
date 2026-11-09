import { useLanguage } from "../i18n/LanguageContext.jsx";
import { voices } from "../i18n/translate.js";

export default function LanguageGate() {
  const { chooseVoice } = useLanguage();
  return (
    <main className="language-gate" aria-labelledby="language-gate-title">
      <div className="language-picker">
        <span className="picker-name">
          <span className="picker-mark" aria-hidden="true">✳</span>
          Karthikeya Kumar
        </span>
        <h1 id="language-gate-title">Choose your English</h1>
        <div className="voice-options" aria-label="Choose your language style">
          {voices.map((voice, index) => (
            <button
              type="button"
              className={`voice-option voice-${voice.id}`}
              key={voice.id}
              onClick={() => chooseVoice(voice.id)}
            >
              <span className="voice-option-number mono" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{voice.label}</span>
              <span className="voice-option-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
        <p className="picker-note">
          Select a language style to enter. You can change it at the top of the
          site anytime.
        </p>
      </div>
    </main>
  );
}
