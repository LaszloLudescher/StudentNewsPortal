import { useState, useEffect } from "react";
import { NewsPortalLogo } from "./components/NewsPortalLogo";
import { NewsList } from "./components/NewsList";
import { NewsContent } from "./components/NewsContent";

export type Lang = "ro" | "hu" | "en" | "de" | "fr";

export interface Translation { title: string; summary: string; content: string; date: string; }
export interface NewsItem { id: number | string; image?: string; translations: Record<Lang, Translation>; }

// Add User Type
export interface User { id: number; email: string; role: "ADMIN" | "EDITOR" | "JOURNALIST" | "USER"; }

export default function App() {
  const [selectedNewsId, setSelectedNewsId] = useState<number | string | null>(null);
  const [lang, setLang] = useState<Lang>("ro");
  const [mobileView, setMobileView] = useState<"list" | "content">("list");
  
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<"none" | "login" | "register">("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default for registration

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/news`);
        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [backendUrl]);

  // Handle Dynamic Background Color
  const getBackgroundColor = () => {
    if (!user) return "#0d0d12"; // Default Dark
    switch (user.role) {
      case "ADMIN": return "#3b0a0a"; // Dark Red
      case "EDITOR": return "#3b360a"; // Dark Yellow
      case "JOURNALIST": return "#0a233b"; // Dark Blue
      case "USER": return "#0a3b18"; // Dark Green
      default: return "#0d0d12";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setUser(await res.json());
      setAuthView("none");
    } else alert("Invalid credentials");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    if (res.ok) {
      setUser(await res.json());
      setAuthView("none");
    } else alert("Registration failed. Email might exist.");
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ fontFamily: "'Inter', sans-serif", background: getBackgroundColor(), transition: "background 0.5s ease" }}>
      
      {/* Sidebar Area */}
      <div className="flex flex-col h-full" style={{ background: "transparent", borderRight: "1px solid rgba(255,255,255,0.07)", width: "clamp(280px, 32vw, 400px)", flexShrink: 0 }}>
        
        {/* Auth Navigation */}
        <div style={{ padding: "16px 24px", display: "flex", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {user ? (
            <div style={{ color: "#fff", fontSize: "13px", display: "flex", justifyContent: "space-between", width: "100%" }}>
              <span>Logged in as <b>{user.role}</b></span>
              <button onClick={() => setUser(null)} style={{ color: "#e85d26", background: "none", border: "none", cursor: "pointer" }}>Logout</button>
            </div>
          ) : (
            <>
              <button onClick={() => setAuthView("login")} style={{ flex: 1, padding: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Sign In</button>
              <button onClick={() => setAuthView("register")} style={{ flex: 1, padding: "8px", background: "#e85d26", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Register</button>
            </>
          )}
        </div>

        <NewsPortalLogo lang={lang} onLangChange={setLang} />
        
        {isLoading ? (
          <div style={{ padding: "24px", color: "rgba(255,255,255,0.4)" }}>Loading...</div>
        ) : (
          <NewsList news={newsData} selectedId={selectedNewsId} onSelectNews={(id) => { setSelectedNewsId(id); setMobileView("content"); }} lang={lang} />
        )}
      </div>

      {/* Main Content Area */}
      <div className="content-panel flex-1 h-full flex flex-col" style={{ background: "#f8f7f4", overflowY: "auto" }}>
        {authView === "login" ? (
          <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
            <h2>Sign In</h2>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: "10px", border: "1px solid #ccc" }}/>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: "10px", border: "1px solid #ccc" }}/>
              <button type="submit" style={{ padding: "12px", background: "#0d0d12", color: "#fff", border: "none", cursor: "pointer" }}>Login</button>
              <button type="button" onClick={() => setAuthView("none")} style={{ padding: "12px", background: "transparent", color: "#000", border: "none", cursor: "pointer", textDecoration: "underline" }}>Cancel</button>
            </form>
          </div>
        ) : authView === "register" ? (
          <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: "10px", border: "1px solid #ccc" }}/>
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: "10px", border: "1px solid #ccc" }}/>
              
              <label>Select Role:</label>
              <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: "10px", border: "1px solid #ccc" }}>
                <option value="USER">User (Default)</option>
                <option value="EDITOR">Editor</option>
                <option value="JOURNALIST">Journalist</option>
              </select>

              <button type="submit" style={{ padding: "12px", background: "#e85d26", color: "#fff", border: "none", cursor: "pointer" }}>Create Account</button>
              <button type="button" onClick={() => setAuthView("none")} style={{ padding: "12px", background: "transparent", color: "#000", border: "none", cursor: "pointer", textDecoration: "underline" }}>Cancel</button>
            </form>
          </div>
        ) : (
          <NewsContent news={newsData.find(n => n.id === selectedNewsId) || null} lang={lang} onBack={() => setMobileView("list")} />
        )}
      </div>
    </div>
  );
}