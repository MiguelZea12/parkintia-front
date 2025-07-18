'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/config/colors';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, color = COLORS.primary.medium }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
          {title}
        </p>
        <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
          {value}
        </p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {trend.isPositive ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              )}
            </svg>
            {trend.value}
          </div>
        )}
      </div>
      <div 
        className="p-3 rounded-full"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
    </div>
  </Card>
);

const ParkingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const ActivityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const OverviewModule: React.FC = () => {
  const { t } = useLanguage();

  const statsData = [
    {
      title: t('totalSpaces'),
      value: '250',
      icon: <ParkingIcon />,
      trend: { value: '+5%', isPositive: true },
      color: COLORS.primary.medium
    },
    {
      title: t('occupiedSpaces'),
      value: '187',
      icon: <ParkingIcon />,
      trend: { value: '+12%', isPositive: true },
      color: '#10B981'
    },
    {
      title: t('todayRevenue'),
      value: '$2,450',
      icon: <MoneyIcon />,
      trend: { value: '+8%', isPositive: true },
      color: '#F59E0B'
    },
    {
      title: t('totalUsers'),
      value: '1,234',
      icon: <UsersIcon />,
      trend: { value: '+3%', isPositive: true },
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.text.dark }}>
            {t('overview')}
          </h1>
          <p className="text-lg mt-1" style={{ color: COLORS.text.light }}>
            {t('welcomeTo')} PARKINTIA
          </p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors"
          style={{ 
            borderColor: COLORS.primary.light,
            color: COLORS.primary.medium 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.primary.light + '20';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{t('refresh')}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: COLORS.text.dark }}>
              Ocupación por Horas
            </h3>
            <select 
              className="px-3 py-1 border rounded-lg text-sm"
              style={{ borderColor: COLORS.primary.light }}
            >
              <option>Hoy</option>
              <option>Ayer</option>
              <option>Última Semana</option>
            </select>
          </div>
          <div 
            className="h-64 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.primary.light}10` }}
          >
            <div className="text-center">
              <ActivityIcon />
              <p className="mt-2 text-sm" style={{ color: COLORS.text.light }}>
                Gráfico de ocupación
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6" style={{ color: COLORS.text.dark }}>
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {[
              { time: '10:30', action: 'Nuevo usuario registrado', user: 'Juan Pérez' },
              { time: '10:15', action: 'Espacio liberado', space: 'A-15' },
              { time: '09:45', action: 'Espacio ocupado', space: 'B-23' },
              { time: '09:30', action: 'Reporte generado', type: 'Diario' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.primary.medium }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: COLORS.text.dark }}>
                    {activity.action}
                  </p>
                  <p className="text-xs" style={{ color: COLORS.text.light }}>
                    {activity.time} - {activity.user || activity.space || activity.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6" style={{ color: COLORS.text.dark }}>
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Generar Reporte', desc: 'Crear reporte de hoy', icon: '📊' },
            { title: 'Agregar Usuario', desc: 'Nuevo usuario al sistema', icon: '👤' },
            { title: 'Ver Cámaras', desc: 'Monitorear en tiempo real', icon: '📹' }
          ].map((action, index) => (
            <button
              key={index}
              className="p-4 border rounded-lg text-left hover:shadow-md transition-all duration-200"
              style={{ borderColor: COLORS.primary.light }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.primary.light + '10';
                e.currentTarget.style.borderColor = COLORS.primary.medium;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = COLORS.primary.light;
              }}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h4 className="font-medium" style={{ color: COLORS.text.dark }}>
                {action.title}
              </h4>
              <p className="text-sm" style={{ color: COLORS.text.light }}>
                {action.desc}
              </p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
