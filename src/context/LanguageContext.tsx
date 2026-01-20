'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, getTranslation } from '@/config/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.es) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Cargar idioma guardado del localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleToggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    handleSetLanguage(newLanguage);
  };

  const t = (key: keyof typeof translations.es) => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage: handleToggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
