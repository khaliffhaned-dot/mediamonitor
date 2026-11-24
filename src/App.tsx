import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MediaFeedView } from "./components/MediaFeedView";
import { AiSentimentLabView } from "./components/AiSentimentLabView";
import { AmecFrameworkView } from "./components/AmecFrameworkView";
import { CloudArchitectureView } from "./components/CloudArchitectureView";
import { RbacSecurityView } from "./components/RbacSecurityView";
import { AnalyticsView } from "./components/AnalyticsView";
import { UserRole, LanguageCode } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const [currentRole, setCurrentRole] = useState<UserRole>("PR Director");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors`}>
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        language={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "feed" && <MediaFeedView />}
            {activeTab === "lab" && <AiSentimentLabView />}
            {activeTab === "amec" && <AmecFrameworkView />}
            {activeTab === "cloud" && <CloudArchitectureView />}
            {activeTab === "rbac" && <RbacSecurityView currentRole={currentRole} onRoleChange={setCurrentRole} />}
            {activeTab === "analytics" && <AnalyticsView />}
          </div>
        </main>
      </div>
    </div>
  );
}
