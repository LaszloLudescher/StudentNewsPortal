import type { Lang } from "../App";

const TITLES: Record<Lang, { line1: string; line2: string }> = {
  ro: { line1: "Teoria", line2: "transpirației" },
  hu: { line1: "Az izzadás", line2: "elmélete" },
  en: { line1: "The Theory of", line2: "Perspiration" },
  de: { line1: "Die Theorie des", line2: "Schwitzens" },
  fr: { line1: "La Théorie de", line2: "la transpiration" },
};

const LANGS: { code: Lang; label: string }[] = [
  { code: "ro", label: "RO" },
  { code: "hu", label: "HU" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
];

interface NewsPortalLogoProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function NewsPortalLogo({ lang, onLangChange }: NewsPortalLogoProps) {
  const title = TITLES[lang];
  return (
    <div style={{ padding: "28px 24px 20px" }}>
      {/* Logo row */}
      <div className="flex items-center gap-3 mb-5">
        {/* Custom ink-drop icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="16" cy="16" r="16" fill="#e85d26" />
          <path d="M16 6 C16 6, 22 13, 22 18 A6 6 0 0 1 10 18 C10 13, 16 6, 16 6Z" fill="white" />
        </svg>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "15px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            {title.line1}
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "#e85d26",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            {title.line2}
          </div>
        </div>
      </div>

      {/* Language switcher */}
      <div className="flex gap-1" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "3px" }}>
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => onLangChange(code)}
            style={{
              flex: 1,
              padding: "5px 0",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              transition: "all 0.15s ease",
              background: lang === code ? "#e85d26" : "transparent",
              color: lang === code ? "#ffffff" : "rgba(255,255,255,0.4)",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
