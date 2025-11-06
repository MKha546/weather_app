import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-lg">
      <div className="flex items-center">
        <button
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all 
          duration-300
          ${
            language === 'vi'  
            ? "bg-white text-blue-600 shadow-lg transform scale-105"
             : "text-white/70 hover:text-white hover:bg-white/10"
             }`} 
          onClick={toggleLanguage}
        >
          VN
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all 
          duration-300
          ${
            language === 'en'  
            ? "bg-white text-blue-600 shadow-lg transform scale-105"
             : "text-white/70 hover:text-white hover:bg-white/10"
             }`} 
          onClick={toggleLanguage}
        >
          EN
        </button>
      </div>
    </div>
  );
}

