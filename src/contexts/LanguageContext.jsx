import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const translateWeather = (description) => {
    if (!description) return description;
    
    const weatherDescriptions = translations[language]?.weatherDescriptions || {};
    // Normalize description: lowercase, trim, and handle special characters
    const normalizedDescription = description.toLowerCase().trim().replace(/\s+/g, ' ');
    
    // Try exact match first
    if (weatherDescriptions[normalizedDescription]) {
      return weatherDescriptions[normalizedDescription];
    }
    
    // Try matching without special characters
    const cleanedDescription = normalizedDescription.replace(/[\/\-]/g, ' ').trim();
    if (weatherDescriptions[cleanedDescription]) {
      return weatherDescriptions[cleanedDescription];
    }
    
    // Try partial matching for compound descriptions
    for (const [key, value] of Object.entries(weatherDescriptions)) {
      if (normalizedDescription.includes(key) || key.includes(normalizedDescription)) {
        return value;
      }
    }
    
    // Fallback to original description
    return description;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    translateWeather,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

