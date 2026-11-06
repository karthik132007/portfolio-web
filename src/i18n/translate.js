import { catalog } from "./catalog.js";

export const voices = [
  { id: "standard", label: "Standard English" },
  { id: "shakespeare", label: "Shakespearean English" },
  { id: "pirate", label: "Pirate English" },
];

export const isVoice = (value) => voices.some((voice) => voice.id === value);

export function translate(source, voice = "standard", values = {}) {
  if (typeof source !== "string" || !source.trim()) return source;
  const key = source.trim();
  const translated =
    voice === "standard" ? key : (catalog[key]?.[voice] ?? key);
  const leading = source.match(/^\s*/)[0];
  const trailing = source.match(/\s*$/)[0];
  return `${leading}${translated}${trailing}`.replace(
    /\{(\w+)\}/g,
    (match, name) => values[name] ?? match,
  );
}
