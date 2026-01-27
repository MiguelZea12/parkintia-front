'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useAuthRedirect';
import { useLanguage } from '@/context/LanguageContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { OverviewModule } from '@/components/dashboard/OverviewModule';
import { CamerasModule } from '@/components/dashboard/CamerasModule';
import { ReportsModule } from '@/components/dashboard/ReportsModule';
import { ChatbotToggle } from '@/components/chatbot';
import { COLORS } from '@/config/colors';

type ActiveModule = 'overview' | 'cameras' | 'reports';

export default function DashboardPage() {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState<ActiveModule>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

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
  
  // Proteger la ruta - usuarios no autenticados van al login
  const { isLoading, shouldRender } = useProtectedRoute();

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule />;
      case 'cameras':
        return <CamerasModule />;
      case 'reports':
        return <ReportsModule />;
      default:
        return <OverviewModule />;
    }
  };

  // Mostrar loader mientras se verifica autenticación o si no debería renderizar
  if (isLoading || !shouldRender) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.accent }}
          ></div>
          <p style={{ color: colors.textSecondary }}>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <Sidebar
        activeModule={activeModule}
        onModuleSelect={(module) => setActiveModule(module as ActiveModule)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full p-6">
          {renderActiveModule()}
        </div>
      </main>

      {/* Chatbot flotante */}
      <ChatbotToggle />
    </div>
  );
}
