import { useId } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function CofounderSystem({ label }) {
  const { t } = useLanguage();
  const id = useId();
  const grid = `${id}-grid`;
  const arrow = `${id}-arrow`;
  return (
    <svg
      className="cofounder-system"
      viewBox="0 0 620 320"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#738363" strokeOpacity=".22" />
        </pattern>
        <marker id={arrow} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="m1 1 5 3-5 3" fill="none" stroke="#526843" strokeWidth="1.5" />
        </marker>
      </defs>
      <rect width="620" height="320" rx="3" fill="#dce4cc" />
      <rect x="13" y="13" width="594" height="294" fill={`url(#${grid})`} />
      <path className="cofounder-chart-marks" d="M32 15H15v17m573-17h17v17m0 256v17h-17m-556 0H15v-17M30 43h560" />
      <text className="cofounder-chart-eyebrow" x="30" y="32">{t("SYSTEM MAP")}</text>
      <text className="cofounder-chart-eyebrow" x="590" y="32" textAnchor="end">{t("SPECIALIST AGENTS")}</text>
      <g className="cofounder-chart-routes" markerEnd={`url(#${arrow})`}>
        <path d="M174 99h21q11 0 11 11v12q0 11 11 11h18" />
        <path d="M174 193h21q11 0 11-11v-9q0-11 11-11h18" strokeDasharray="4 4" />
        <path d="M375 146h28q11 0 11-11V99q0-11 11-11h18" />
        <path d="M375 146h68" />
        <path d="M375 146h28q11 0 11 11v38q0 11 11 11h18" />
        <path d="M305 195v54" strokeDasharray="4 4" />
      </g>
      <g className="cofounder-chart-panel">
        <rect x="30" y="71" width="144" height="56" rx="3" />
        <rect x="30" y="157" width="144" height="72" rx="3" />
        <rect x="445" y="65" width="145" height="46" rx="3" />
        <rect x="445" y="123" width="145" height="46" rx="3" />
        <rect x="445" y="183" width="145" height="46" rx="3" />
        <rect x="200" y="251" width="210" height="43" rx="3" />
      </g>
      <rect x="235" y="98" width="140" height="97" rx="3" fill="#374b31" stroke="#506647" strokeWidth="2" />
      <g className="cofounder-chart-text" textAnchor="middle">
        <text x="102" y="106">{t("Founder brief")}</text>
        <text className="cofounder-chart-context" x="102" y="188">{t("Company context")}</text>
        <text className="cofounder-chart-detail" x="102" y="209">{t("Hybrid retrieval")}</text>
        <text x="517" y="95">{t("Research")}</text>
        <text x="517" y="153">{t("Writing")}</text>
        <text x="517" y="213">{t("Data analysis")}</text>
        <text x="305" y="280">{t("Reply + live trace")}</text>
        <text className="cofounder-chart-core" x="305" y="145">{t("CEO")}</text>
        <text className="cofounder-chart-core-detail" x="305" y="173">{t("Agent routing")}</text>
      </g>
      <g fill="#6a8059">
        <circle cx="174" cy="99" r="3.5" />
        <circle cx="174" cy="193" r="3.5" />
        <circle cx="375" cy="146" r="3.5" />
        <circle cx="305" cy="195" r="3.5" />
      </g>
      <path d="M42 274h34m-34 7h23m477-7h35m-24 7h24" className="cofounder-chart-marks" />
    </svg>
  );
}
