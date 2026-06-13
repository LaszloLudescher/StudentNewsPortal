import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Lang, NewsItem } from "../App";

interface NewsContentProps {
  news: NewsItem | null;
  lang: Lang;
  onBack: () => void;
}

const PLACEHOLDER: Record<Lang, string> = {
  ro: "Selectează un articol pentru a-l citi",
  hu: "Válasszon egy cikket az olvasáshoz",
  en: "Select an article to read",
  de: "Wählen Sie einen Artikel zum Lesen",
  fr: "Sélectionnez un article à lire",
};

const BACK_LABEL: Record<Lang, string> = {
  ro: "← Înapoi",
  hu: "← Vissza",
  en: "← Back",
  de: "← Zurück",
  fr: "← Retour",
};

export function NewsContent({ news, lang, onBack }: NewsContentProps) {
  if (!news) {
    return (
      <div className="h-full flex flex-col items-center justify-center" style={{ gap: "12px" }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#e85d26" fillOpacity="0.08" />
          <path d="M24 10 C24 10, 33 20, 33 27 A9 9 0 0 1 15 27 C15 20, 24 10, 24 10Z" fill="#e85d26" fillOpacity="0.3" />
        </svg>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#aaa9a3",
          letterSpacing: "0.01em",
        }}>
          {PLACEHOLDER[lang]}
        </p>
      </div>
    );
  }

  const t = news.translations[lang];

  return (
    <div className="h-full flex flex-col" style={{ minWidth: 0 }}>
      {/* Mobile back button */}
      <div style={{ display: "none" }} className="mobile-back-btn">
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            background: "#0d0d12",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            cursor: "pointer",
            color: "#e85d26",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            width: "100%",
          }}
        >
          {BACK_LABEL[lang]}
        </button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mobile-back-btn { display: block !important; }
        }
      `}</style>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#ddd #f8f7f4" }}>
        {/* Hero image */}
        {news.image && (
          <div style={{ width: "100%", aspectRatio: "16/7", overflow: "hidden", flexShrink: 0 }}>
            <ImageWithFallback
              src={news.image}
              alt={t.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        <div style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "clamp(24px, 5vw, 56px) clamp(16px, 5vw, 48px)",
        }}>
          {/* Date tag */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "20px",
            padding: "4px 10px",
            background: "rgba(232,93,38,0.1)",
            borderRadius: "4px",
          }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#e85d26", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#e85d26",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              {t.date}
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: 800,
            color: "#1a1814",
            lineHeight: 1.2,
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}>
            {t.title}
          </h2>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "32px", height: "2px", background: "#e85d26", flexShrink: 0 }} />
            <div style={{ flex: 1, height: "1px", background: "#e8e6e1" }} />
          </div>

          {/* Summary / lead */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(14px, 2vw, 16px)",
            fontWeight: 500,
            color: "#5a5850",
            lineHeight: 1.7,
            marginBottom: "32px",
            fontStyle: "italic",
            borderLeft: "3px solid #e85d26",
            paddingLeft: "16px",
          }}>
            {t.summary}
          </p>

          {/* Body */}
          <div>
            {t.content.split("\n\n").map((paragraph, index) => (
              <p key={index} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#3d3b35",
                lineHeight: 1.8,
                marginBottom: "20px",
                fontWeight: 400,
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
