import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import "../style.css";
import "./interaction.css";
import "./components/inventory.css";
import "./motion.css";
import "./language.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
