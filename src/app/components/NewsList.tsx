import type { Lang, NewsItem } from "../App";

interface NewsListProps {
  news: NewsItem[];
  selectedId: number | null;
  onSelectNews: (id: number) => void;
  lang: Lang;
}

export function NewsList({ news, selectedId, onSelectNews, lang }: NewsListProps) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Section label */}
      <div style={{
        padding: "0 24px 12px",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.25)",
        textTransform: "uppercase",
      }}>
        Articole recente
      </div>

      {news.map((item, index) => {
        const t = item.translations[lang];
        const isSelected = selectedId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectNews(item.id)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "16px 24px",
              border: "none",
              background: isSelected ? "rgba(232,93,38,0.12)" : "transparent",
              borderLeft: isSelected ? "3px solid #e85d26" : "3px solid transparent",
              cursor: "pointer",
              transition: "all 0.15s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }
            }}
          >
            {/* Index number */}
            <div style={{
              fontSize: "10px",
              fontWeight: 700,
              color: isSelected ? "#e85d26" : "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
              marginBottom: "6px",
              fontFamily: "'Inter', sans-serif",
            }}>
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              color: isSelected ? "#ffffff" : "rgba(255,255,255,0.75)",
              lineHeight: 1.4,
              marginBottom: "6px",
              fontFamily: "'Inter', sans-serif",
            }}>
              {t.title}
            </div>

            {/* Summary */}
            <div style={{
              fontSize: "11.5px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {t.summary}
            </div>

            {/* Date */}
            <div style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
              marginTop: "8px",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.03em",
            }}>
              {t.date}
            </div>
          </button>
        );
      })}
    </div>
  );
}
