'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useAuthRedirect';
import { useLanguage } from '@/context/LanguageContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { OverviewModule } from '@/components/dashboard/OverviewModule';
import { CamerasModule } from '@/components/dashboard/CamerasModule';
import { ReportsModule } from '@/components/dashboard/ReportsModule';
import { UsersModule } from '@/components/dashboard/UsersModule';
import { ChatbotToggle } from '@/components/chatbot';
import { COLORS } from '@/config/colors';

type ActiveModule = 'overview' | 'cameras' | 'reports' | 'users' | 'parking' | 'analytics';

export default function DashboardPage() {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState<ActiveModule>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Proteger la ruta - usuarios no autenticados van al login
  const { isLoading } = useProtectedRoute();

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule />;
      case 'cameras':
        return <CamerasModule />;
      case 'reports':
        return <ReportsModule />;
      case 'users':
        return <UsersModule />;
      case 'parking':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: COLORS.text.dark }}>
              {t('parking')}
            </h1>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.primary.light}20`, color: COLORS.primary.medium }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.text.dark }}>
                Módulo de Parking
              </h3>
              <p style={{ color: COLORS.text.light }}>
                Este módulo estará disponible próximamente. Aquí podrás gestionar espacios de parking, 
                ver ocupación en tiempo real y administrar reservas.
              </p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: COLORS.text.dark }}>
              {t('analytics')}
            </h1>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.primary.light}20`, color: COLORS.primary.medium }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.text.dark }}>
                Módulo de Analíticas
              </h3>
              <p style={{ color: COLORS.text.light }}>
                Este módulo estará disponible próximamente. Aquí podrás ver gráficos avanzados, 
                métricas de rendimiento y análisis detallados del sistema.
              </p>
            </div>
          </div>
        );
      default:
        return <OverviewModule />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: COLORS.primary.medium }}
          ></div>
          <p style={{ color: COLORS.text.light }}>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
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
