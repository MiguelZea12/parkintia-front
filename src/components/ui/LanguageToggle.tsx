'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COLORS } from '@/config/colors';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium" style={{ color: COLORS.text.light }}>
        {t('language')}:
      </span>
      <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: COLORS.primary.light }}>
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            language === 'es'
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{
            backgroundColor: language === 'es' ? COLORS.primary.medium : 'transparent',
          }}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            language === 'en'
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          style={{
            backgroundColor: language === 'en' ? COLORS.primary.medium : 'transparent',
          }}
        >
          EN
        </button>
      </div>
    </div>
  );
};
