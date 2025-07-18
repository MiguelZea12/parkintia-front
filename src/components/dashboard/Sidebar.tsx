'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { COLORS } from '@/config/colors';

interface SidebarProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  {
    id: 'overview',
    icon: 'dashboard',
    translationKey: 'overview' as const
  },
  {
    id: 'cameras',
    icon: 'camera',
    translationKey: 'cameras' as const
  },
  {
    id: 'reports',
    icon: 'report',
    translationKey: 'reports' as const
  },
  {
    id: 'users',
    icon: 'users',
    translationKey: 'users' as const
  }
];

// Icon Components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
  </svg>
);

const CameraIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'dashboard': return <DashboardIcon />;
    case 'camera': return <CameraIcon />;
    case 'report': return <ReportIcon />;
    case 'users': return <UsersIcon />;
    default: return <DashboardIcon />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onModuleSelect, 
  collapsed, 
  onToggleCollapse 
}) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div 
      className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out`}
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.primary.light}15 0%, ${COLORS.secondary.white} 100%)`,
        borderColor: `${COLORS.primary.light}30`
      }}
    >
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: `${COLORS.primary.light}30` }}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: COLORS.gradients.primary }}
              >
                P
              </div>
              <h1 className="text-lg font-bold" style={{ color: COLORS.text.dark }}>
                PARKINTIA
              </h1>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: COLORS.text.light }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b" style={{ borderColor: `${COLORS.primary.light}30` }}>
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
              style={{ background: COLORS.gradients.primary }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: COLORS.text.dark }}>
                {user?.name || 'Usuario'}
              </p>
              <p className="text-xs truncate" style={{ color: COLORS.text.light }}>
                {user?.email || 'email@ejemplo.com'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onModuleSelect(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeModule === item.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                style={{
                  backgroundColor: activeModule === item.id ? COLORS.primary.medium : 'transparent',
                  color: activeModule === item.id ? COLORS.secondary.white : COLORS.text.light
                }}
                onMouseEnter={(e) => {
                  if (activeModule !== item.id) {
                    e.currentTarget.style.backgroundColor = `${COLORS.primary.light}20`;
                    e.currentTarget.style.color = COLORS.primary.medium;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeModule !== item.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = COLORS.text.light;
                  }
                }}
              >
                {getIcon(item.icon)}
                {!collapsed && (
                  <span className="font-medium">
                    {t(item.translationKey)}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: `${COLORS.primary.light}30` }}>
        {!collapsed && (
          <div className="mb-4">
            <LanguageToggle />
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-50 hover:text-red-600"
          style={{ color: COLORS.text.light }}
        >
          <LogoutIcon />
          {!collapsed && (
            <span className="font-medium">
              {t('logout')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
