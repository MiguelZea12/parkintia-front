'use client';

import React, { useState, useEffect } from 'react';
import { CardProps } from '@/types/ui';
import { COLORS } from '@/config/colors';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md'
}) => {
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

  const baseClasses = 'rounded-2xl border-0 transition-colors duration-300';
  
  const paddingClasses = {
    none: '',
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-xl',
    lg: 'shadow-2xl'
  };

  const combinedClassName = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    className
  ].filter(Boolean).join(' ');

  const getShadow = () => {
    if (shadow === 'none') return 'none';
    
    if (isDarkMode) {
      // Dark mode shadows - more subtle
      switch (shadow) {
        case 'sm':
          return `0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)`;
        case 'md':
          return `0 10px 25px rgba(0, 0, 0, 0.4), 0 5px 10px rgba(0, 0, 0, 0.3)`;
        case 'lg':
          return `0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.4)`;
        default:
          return `0 10px 25px rgba(0, 0, 0, 0.4), 0 5px 10px rgba(0, 0, 0, 0.3)`;
      }
    } else {
      // Light mode shadows - with accent color hint
      switch (shadow) {
        case 'sm':
          return `0 2px 8px rgba(20, 184, 166, 0.08), 0 1px 3px rgba(20, 184, 166, 0.04)`;
        case 'md':
          return `0 10px 25px rgba(20, 184, 166, 0.1), 0 5px 10px rgba(20, 184, 166, 0.05)`;
        case 'lg':
          return `0 20px 40px rgba(20, 184, 166, 0.12), 0 10px 20px rgba(20, 184, 166, 0.06)`;
        default:
          return `0 10px 25px rgba(20, 184, 166, 0.1), 0 5px 10px rgba(20, 184, 166, 0.05)`;
      }
    }
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    boxShadow: getShadow(),
    border: `1px solid ${colors.border}`,
  };

  return (
    <div className={combinedClassName} style={cardStyle}>
      {children}
    </div>
  );
};
