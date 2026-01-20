'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { InputProps } from '@/types/ui';
import { COLORS } from '@/config/colors';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', style, ...props }, ref) => {
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

    const baseInputClasses = 'block px-4 py-3 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-0';
    
    const errorClasses = error 
      ? 'border-red-300 focus:border-red-500' 
      : '';
    
    const widthClass = fullWidth ? 'w-full' : '';
    const iconPadding = icon ? 'pl-12' : '';
    
    const inputClassName = [
      baseInputClasses,
      errorClasses,
      widthClass,
      iconPadding,
      className
    ].filter(Boolean).join(' ');

    const customStyle = {
      backgroundColor: error ? `${COLORS.status.error}15` : colors.surface,
      borderColor: error ? COLORS.status.error : colors.border,
      color: colors.textPrimary,
      ...style,
      ...(props.disabled && {
        backgroundColor: isDarkMode ? colors.background : '#F9FAFB',
        borderColor: colors.border,
        color: colors.textSecondary,
        opacity: 0.6
      })
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label 
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.textPrimary }}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div 
              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              style={{ color: colors.textSecondary }}
            >
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClassName}
            style={customStyle}
            onFocus={(e) => {
              if (!error) {
                e.target.style.borderColor = colors.accent;
                e.target.style.backgroundColor = colors.surface;
                e.target.style.boxShadow = `0 0 0 3px ${colors.accent}20`;
              }
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!error) {
                e.target.style.borderColor = colors.border;
                e.target.style.backgroundColor = colors.surface;
                e.target.style.boxShadow = 'none';
              }
              props.onBlur?.(e);
            }}
            {...props}
          />
        </div>
        
        {error && (
          <p 
            className="mt-2 text-sm font-medium"
            style={{ color: COLORS.status.error }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
