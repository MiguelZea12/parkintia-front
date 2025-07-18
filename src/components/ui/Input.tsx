'use client';

import React, { forwardRef } from 'react';
import { InputProps } from '@/types/ui';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', ...props }, ref) => {
    const baseInputClasses = 'block px-3 py-2 border rounded-lg text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
    
    const errorClasses = error 
      ? 'border-red-300 bg-red-50 focus:ring-red-500' 
      : 'border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500';
    
    const widthClass = fullWidth ? 'w-full' : '';
    const iconPadding = icon ? 'pl-10' : '';
    
    const inputClassName = [
      baseInputClasses,
      errorClasses,
      widthClass,
      iconPadding,
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClassName}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
