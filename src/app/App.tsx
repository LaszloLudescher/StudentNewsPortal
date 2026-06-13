import { useState, useEffect } from "react";
import { NewsPortalLogo } from "./components/NewsPortalLogo";
import { NewsList } from "./components/NewsList";
import { NewsContent } from "./components/NewsContent";

export type Lang = "ro" | "hu" | "en" | "de" | "fr";

export interface Translation {
  title: string;
  summary: string;
  content: string;
  date: string;
}

export interface NewsItem {
  id: number | string; // Updated to accept string IDs from backend
  image?: string;
  translations: Record<Lang, Translation>;
}

export default function App() {
  const [selectedNewsId, setSelectedNewsId] = useState<number | string | null>(null);
  const [lang, setLang] = useState<Lang>("ro");
  const [mobileView, setMobileView] = useState<"list" | "content">("list");
  
  // New state variables for backend data
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the backend using the .env variable
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Read the IP address from the .env file. Fallback to localhost if missing.
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        
        const response = await fetch(`${backendUrl}/api/news`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const selectedNews = newsData.find((n) => n.id === selectedNewsId) || null;

  function handleSelectNews(id: number | string) {
    setSelectedNewsId(id);
    setMobileView("content");
  }

  function handleBack() {
    setMobileView("list");
  }

  return (
    <div className="h-screen flex overflow-hidden" style={{ fontFamily: "'Inter', sans-serif", background: "#0d0d12" }}>
      {/* Sidebar */}
      <div
        className="flex flex-col h-full"
        style={{
          background: "#0d0d12",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          width: "clamp(280px, 32vw, 400px)",
          minWidth: 0,
          flexShrink: 0,
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            .sidebar-panel { display: ${mobileView === "list" ? "flex" : "none"} !important; width: 100vw !important; }
            .content-panel { display: ${mobileView === "content" ? "flex" : "none"} !important; width: 100vw !important; }
          }
        `}</style>
        <div className="sidebar-panel flex flex-col h-full w-full">
          <NewsPortalLogo lang={lang} onLangChange={setLang} />
          
          {/* Show a loading state while fetching from backend */}
          {isLoading ? (
            <div style={{ padding: "24px", color: "rgba(255,255,255,0.4)", fontSize: "13px", textAlign: "center" }}>
              Loading news from server...
            </div>
          ) : (
            <NewsList
              news={newsData}
              selectedId={selectedNewsId}
              onSelectNews={handleSelectNews}
              lang={lang}
            />
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="content-panel flex-1 h-full flex flex-col" style={{ background: "#f8f7f4", minWidth: 0 }}>
        <NewsContent news={selectedNews} lang={lang} onBack={handleBack} />
      </div>
    </div>
  );
}