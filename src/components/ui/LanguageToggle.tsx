'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COLORS } from '@/config/colors';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <div className="flex items-center space-x-2">
      <span 
        className="text-sm font-medium"
        style={{ color: colors.textSecondary }}
      >
        {t('language')}:
      </span>
      <div 
        className="flex rounded-lg overflow-hidden border-2 transition-colors duration-300"
        style={{ borderColor: colors.border }}
      >
        <button
          onClick={() => setLanguage('es')}
          className="px-3 py-1 text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: language === 'es' ? colors.accent : 'transparent',
            color: language === 'es' ? '#FFFFFF' : colors.textSecondary,
          }}
          onMouseEnter={(e) => {
            if (language !== 'es') {
              e.currentTarget.style.backgroundColor = `${colors.accent}20`;
            }
          }}
          onMouseLeave={(e) => {
            if (language !== 'es') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className="px-3 py-1 text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: language === 'en' ? colors.accent : 'transparent',
            color: language === 'en' ? '#FFFFFF' : colors.textSecondary,
          }}
          onMouseEnter={(e) => {
            if (language !== 'en') {
              e.currentTarget.style.backgroundColor = `${colors.accent}20`;
            }
          }}
          onMouseLeave={(e) => {
            if (language !== 'en') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          EN
        </button>
      </div>
    </div>
  );
};
