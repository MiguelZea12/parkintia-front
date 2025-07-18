'use client';

import React from 'react';
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
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const variantClasses = {
    primary: 'text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 text-white hover:bg-white hover:text-blue-600 focus:ring-blue-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Estilos personalizados para el botón primario con gradiente
  const primaryStyle = variant === 'primary' ? {
    background: COLORS.gradients.primary,
    border: 'none',
    color: COLORS.text.white,
    boxShadow: '0 8px 25px rgba(30, 103, 211, 0.3)',
    ...style
  } : style;

  // Estilos para botón outline con borde de gradiente
  const outlineStyle = variant === 'outline' ? {
    background: 'transparent',
    border: `2px solid ${COLORS.primary.medium}`,
    color: COLORS.primary.dark,
    ...style
  } : primaryStyle;

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
      e.currentTarget.style.boxShadow = '0 12px 35px rgba(30, 103, 211, 0.4)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'primary' && !disabled && !isLoading) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 103, 211, 0.3)';
    }
  };

  return (
    <button
      className={combinedClassName}
      style={outlineStyle}
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
