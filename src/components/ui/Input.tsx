'use client';

import React, { forwardRef } from 'react';
import { InputProps } from '@/types/ui';
import { COLORS } from '@/config/colors';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', style, ...props }, ref) => {
    const baseInputClasses = 'block px-4 py-3 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-900';
    
    const errorClasses = error 
      ? 'border-red-300 bg-red-50 focus:border-red-500' 
      : 'border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500';
    
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
      backgroundColor: error ? '#FEF2F2' : COLORS.secondary.green,
      borderColor: error ? '#FCA5A5' : '#E5E7EB',
      color: '#111827', // Forzar texto oscuro
      ...style,
      ...(props.disabled && {
        backgroundColor: '#F9FAFB',
        borderColor: '#D1D5DB',
        color: '#6B7280'
      })
    };

    const focusStyle = !error ? {
      '&:focus': {
        borderColor: COLORS.primary.medium,
        backgroundColor: COLORS.secondary.white,
        boxShadow: `0 0 0 3px ${COLORS.primary.light}20`
      }
    } : {};

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text.dark }}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: COLORS.text.light }}>
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClassName}
            style={customStyle}
            onFocus={(e) => {
              if (!error) {
                e.target.style.borderColor = COLORS.primary.medium;
                e.target.style.backgroundColor = COLORS.secondary.white;
                e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary.light}20`;
                e.target.style.color = '#111827'; // Mantener texto oscuro
              }
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!error) {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.backgroundColor = COLORS.secondary.green;
                e.target.style.boxShadow = 'none';
                e.target.style.color = '#111827'; // Mantener texto oscuro
              }
              props.onBlur?.(e);
            }}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
