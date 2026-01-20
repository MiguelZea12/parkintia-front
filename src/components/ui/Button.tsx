'use client';

import React, { useState, useEffect } from 'react';
import { ButtonProps } from '@/types/ui';
import { LoadingSpinner } from './LoadingSpinner';
import { COLORS } from '@/config/colors';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  style,
  ...props
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

  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const variantClasses = {
    primary: 'text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 hover:bg-opacity-10 focus:ring-2',
    ghost: 'hover:bg-opacity-10 focus:ring-2'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Estilos personalizados para el botón primario
  const primaryStyle = variant === 'primary' ? {
    backgroundColor: colors.accent,
    border: 'none',
    color: '#FFFFFF',
    boxShadow: `0 8px 25px ${colors.accent}40`,
    ...style
  } : style;

  // Estilos para botón outline
  const outlineStyle = variant === 'outline' ? {
    background: 'transparent',
    border: `2px solid ${colors.accent}`,
    color: colors.accent,
    ...style
  } : primaryStyle;

  // Estilos para botón ghost
  const ghostStyle = variant === 'ghost' ? {
    background: 'transparent',
    border: 'none',
    color: colors.textPrimary,
    ...style
  } : outlineStyle;

  const combinedClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className
  ].filter(Boolean).join(' ');

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'primary' && !disabled && !isLoading) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 12px 35px ${colors.accent}50`;
      e.currentTarget.style.backgroundColor = colors.accentLight;
    } else if (variant === 'outline' && !disabled && !isLoading) {
      e.currentTarget.style.backgroundColor = `${colors.accent}15`;
    } else if (variant === 'ghost' && !disabled && !isLoading) {
      e.currentTarget.style.backgroundColor = `${colors.accent}10`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'primary' && !disabled && !isLoading) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = `0 8px 25px ${colors.accent}40`;
      e.currentTarget.style.backgroundColor = colors.accent;
    } else if (variant === 'outline' && !disabled && !isLoading) {
      e.currentTarget.style.backgroundColor = 'transparent';
    } else if (variant === 'ghost' && !disabled && !isLoading) {
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  return (
    <button
      className={combinedClassName}
      style={ghostStyle}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          <span className="ml-2">Cargando...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
