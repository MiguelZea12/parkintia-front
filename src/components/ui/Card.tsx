'use client';

import React from 'react';
import { CardProps } from '@/types/ui';
import { COLORS } from '@/config/colors';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md'
}) => {
  const baseClasses = 'rounded-2xl border-0';
  
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

  const cardStyle = {
    backgroundColor: COLORS.secondary.white,
    boxShadow: shadow !== 'none' ? '0 20px 40px rgba(30, 103, 211, 0.08), 0 10px 20px rgba(30, 103, 211, 0.04)' : 'none',
    border: `1px solid ${COLORS.secondary.green}20`,
  };

  return (
    <div className={combinedClassName} style={cardStyle}>
      {children}
    </div>
  );
};
