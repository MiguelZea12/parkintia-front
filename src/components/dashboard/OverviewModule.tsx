'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/config/colors';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';
import { 
  Building2, 
  DollarSign, 
  Users, 
  Activity,
  RefreshCw,
  FileText,
  UserPlus,
  Camera,
  TrendingUp,
  TrendingDown,
  Calendar,
  History,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
  Clock
} from 'lucide-react';

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

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, color }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
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
  const defaultColor = color || colors.accent;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
            {title}
          </p>
          <p className="text-3xl font-bold mt-2" style={{ color: colors.textPrimary }}>
            {value}
          </p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      <div 
        className="p-3 rounded-full"
        style={{ backgroundColor: `${defaultColor}20`, color: defaultColor }}
      >
        {icon}
      </div>
    </div>
  </Card>
  );
};

const ParkingIcon = () => <Building2 className="w-6 h-6" />;

const MoneyIcon = () => <DollarSign className="w-6 h-6" />;

const UsersIcon = () => <Users className="w-6 h-6" />;

const ActivityIcon = () => <Activity className="w-6 h-6" />;

export const OverviewModule: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'yesterday' | 'week'>('today');
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

  // Datos dinámicos según el período seleccionado
  const getChartData = () => {
    switch (selectedPeriod) {
      case 'today':
        return [
          { hour: '00:00', value: 15, isCurrentTime: false },
          { hour: '02:00', value: 8, isCurrentTime: false },
          { hour: '04:00', value: 5, isCurrentTime: false },
          { hour: '06:00', value: 25, isCurrentTime: false },
          { hour: '08:00', value: 65, isCurrentTime: false },
          { hour: '10:00', value: 85, isCurrentTime: false },
          { hour: '12:00', value: 95, isCurrentTime: false },
          { hour: '14:00', value: 88, isCurrentTime: true },
          { hour: '16:00', value: 78, isCurrentTime: false },
          { hour: '18:00', value: 92, isCurrentTime: false },
          { hour: '20:00', value: 72, isCurrentTime: false },
          { hour: '22:00', value: 45, isCurrentTime: false }
        ];
      case 'yesterday':
        return [
          { hour: '00:00', value: 12, isCurrentTime: false },
          { hour: '02:00', value: 6, isCurrentTime: false },
          { hour: '04:00', value: 3, isCurrentTime: false },
          { hour: '06:00', value: 22, isCurrentTime: false },
          { hour: '08:00', value: 58, isCurrentTime: false },
          { hour: '10:00', value: 82, isCurrentTime: false },
          { hour: '12:00', value: 90, isCurrentTime: false },
          { hour: '14:00', value: 85, isCurrentTime: false },
          { hour: '16:00', value: 75, isCurrentTime: false },
          { hour: '18:00', value: 88, isCurrentTime: false },
          { hour: '20:00', value: 68, isCurrentTime: false },
          { hour: '22:00', value: 42, isCurrentTime: false }
        ];
      case 'week':
        return [
          { hour: '00:00', value: 18, isCurrentTime: false },
          { hour: '02:00', value: 12, isCurrentTime: false },
          { hour: '04:00', value: 8, isCurrentTime: false },
          { hour: '06:00', value: 28, isCurrentTime: false },
          { hour: '08:00', value: 62, isCurrentTime: false },
          { hour: '10:00', value: 78, isCurrentTime: false },
          { hour: '12:00', value: 85, isCurrentTime: false },
          { hour: '14:00', value: 80, isCurrentTime: false },
          { hour: '16:00', value: 72, isCurrentTime: false },
          { hour: '18:00', value: 85, isCurrentTime: false },
          { hour: '20:00', value: 65, isCurrentTime: false },
          { hour: '22:00', value: 38, isCurrentTime: false }
        ];
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 rounded-xl shadow-lg border backdrop-blur-sm"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: colors.border
          }}
        >
          <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
            {`${label} - ${getPeriodLabel()}`}
          </p>
          <p className="text-sm" style={{ color: getGradientColor() }}>
            <span className="font-bold">{`${payload[0].value}%`}</span> ocupación
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isCurrentTime && selectedPeriod === 'today') {
      return (
        <g>
          <circle 
            cx={cx} 
            cy={cy} 
            r="6" 
            fill="#ef4444" 
            stroke="white" 
            strokeWidth="3"
            className="animate-pulse"
          />
          <circle 
            cx={cx} 
            cy={cy} 
            r="12" 
            fill="#ef4444" 
            fillOpacity="0.2"
            className="animate-ping"
          />
        </g>
      );
    }
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r="5" 
        fill="white" 
        stroke={getGradientColor()} 
        strokeWidth="3"
        className="hover:r-8 transition-all duration-200 cursor-pointer"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />
    );
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'today': return 'Hoy';
      case 'yesterday': return 'Ayer';
      case 'week': return 'Promedio Semanal';
    }
  };

  const getGradientColor = () => {
    switch (selectedPeriod) {
      case 'today': return colors.accent;
      case 'yesterday': return COLORS.status.success;
      case 'week': return '#8B5CF6';
    }
  };

  const statsData = [
    {
      title: t('totalSpaces'),
      value: '250',
      icon: <ParkingIcon />,
      trend: { value: '+5%', isPositive: true },
      color: colors.accent
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
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            {t('overview')}
          </h1>
          <p className="text-lg mt-1" style={{ color: colors.textSecondary }}>
            {t('welcomeTo')} PARKINTIA
          </p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors cursor-pointer"
          style={{ 
            borderColor: colors.border,
            color: colors.accent,
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${colors.accent}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <RefreshCw className="w-4 h-4" />
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
            <div>
              <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                Ocupación por Horas
              </h3>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                {getPeriodLabel()} - Patrón de ocupación
              </p>
            </div>
            <div className="relative">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'today' | 'yesterday' | 'week')}
                className="px-4 py-2 pl-10 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 appearance-none"
                style={{ 
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.surface,
                  minWidth: '160px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = getGradientColor();
                  e.target.style.boxShadow = `0 0 0 3px ${getGradientColor()}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="today">Hoy</option>
                <option value="yesterday">Ayer</option>
                <option value="week">Última Semana</option>
              </select>
              
              {/* Icon overlay */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                {selectedPeriod === 'today' && <Calendar className="w-4 h-4" style={{ color: colors.textSecondary }} />}
                {selectedPeriod === 'yesterday' && <History className="w-4 h-4" style={{ color: colors.textSecondary }} />}
                {selectedPeriod === 'week' && <BarChart3 className="w-4 h-4" style={{ color: colors.textSecondary }} />}
              </div>
              
              {/* Dropdown arrow */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4" style={{ color: colors.textSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-80 relative overflow-hidden rounded-xl" style={{ backgroundColor: colors.background }}>
            {/* Recharts Professional Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getChartData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id={`colorGradient-${selectedPeriod}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getGradientColor()} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={getGradientColor()} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e2e8f0" 
                  strokeOpacity={0.5}
                />
                
                <XAxis 
                  dataKey="hour" 
                  tick={{ 
                    fontSize: 11, 
                    fill: colors.textSecondary,
                    fontWeight: 500 
                  }}
                  tickLine={false}
                  axisLine={{ stroke: colors.border, strokeWidth: 1 }}
                />
                
                <YAxis 
                  domain={[0, 100]}
                  tick={{ 
                    fontSize: 11, 
                    fill: colors.textSecondary,
                    fontWeight: 500 
                  }}
                  tickLine={false}
                  axisLine={{ stroke: colors.border, strokeWidth: 1 }}
                  tickFormatter={(value: any) => `${value}%`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                {/* Reference line for current time (only today) */}
                {selectedPeriod === 'today' && (
                  <ReferenceLine 
                    x="14:00" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5" 
                    strokeWidth={2}
                    label={{ 
                      value: "Ahora", 
                      position: "top",
                      style: { fill: '#ef4444', fontSize: '10px', fontWeight: 'bold' }
                    }}
                  />
                )}
                
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={getGradientColor()}
                  strokeWidth={3}
                  fill={`url(#colorGradient-${selectedPeriod})`}
                  dot={<CustomDot />}
                  activeDot={{ 
                    r: 8, 
                    fill: getGradientColor(),
                    stroke: 'white',
                    strokeWidth: 3,
                    style: { filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }
                  }}
                  animationDuration={800}
                  animationEasing="ease-in-out"
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Enhanced Stats Overlay */}
            <div 
              className="absolute top-4 left-4 bg-opacity-95 backdrop-blur-sm p-3 rounded-xl shadow-lg border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border
              }}
            >
              <div className="text-xs space-y-2">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="w-3 h-3" style={{ color: colors.textSecondary }} />
                    <span style={{ color: colors.textSecondary }}>Pico máximo:</span>
                  </div>
                  <span style={{ color: getGradientColor() }} className="font-bold text-lg">
                    {Math.max(...getChartData().map(d => d.value))}%
                  </span>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-2">
                    <Minus className="w-3 h-3" style={{ color: colors.textSecondary }} />
                    <span style={{ color: colors.textSecondary }}>Promedio:</span>
                  </div>
                  <span style={{ color: colors.textPrimary }} className="font-semibold">
                    {Math.round(getChartData().reduce((acc, d) => acc + d.value, 0) / getChartData().length)}%
                  </span>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-2">
                    <ArrowDown className="w-3 h-3" style={{ color: colors.textSecondary }} />
                    <span style={{ color: colors.textSecondary }}>Mínimo:</span>
                  </div>
                  <span style={{ color: colors.textSecondary }} className="font-medium">
                    {Math.min(...getChartData().map(d => d.value))}%
                  </span>
                </div>
              </div>
            </div>

            {/* Period Indicator */}
            <div 
              className="absolute top-4 right-4 bg-opacity-95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border
              }}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{ backgroundColor: getGradientColor() }}
                />
                <span 
                  style={{ color: colors.textPrimary }} 
                  className="font-semibold text-sm"
                >
                  {getPeriodLabel()}
                </span>
              </div>
            </div>

            {/* Current Time Indicator (only for today) */}
            {selectedPeriod === 'today' && (
              <div className="absolute bottom-4 left-4 bg-red-50 bg-opacity-95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-red-100">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-red-500 animate-pulse" />
                  <span className="text-red-600 font-medium text-xs">
                    Tiempo actual: 14:00
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6" style={{ color: colors.textPrimary }}>
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {[
              { time: '10:30', action: 'Nuevo usuario registrado', user: 'Juan Pérez' },
              { time: '10:15', action: 'Espacio liberado', space: 'A-15' },
              { time: '09:45', action: 'Espacio ocupado', space: 'B-23' },
              { time: '09:30', action: 'Reporte generado', type: 'Diario' }
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer"
                style={{ 
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.accent}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {activity.action}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
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
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.textPrimary }}>
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Generar Reporte', 
              desc: 'Crear reporte de hoy', 
              icon: <FileText className="w-6 h-6" />
            },
            { 
              title: 'Agregar Usuario', 
              desc: 'Nuevo usuario al sistema', 
              icon: <UserPlus className="w-6 h-6" />
            },
            { 
              title: 'Ver Cámaras', 
              desc: 'Monitorear en tiempo real', 
              icon: <Camera className="w-6 h-6" />
            }
          ].map((action, index) => (
            <button
              key={index}
              className="p-4 border rounded-lg text-left hover:shadow-md transition-all duration-200 cursor-pointer"
              style={{ 
                borderColor: colors.border,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.accent}10`;
                e.currentTarget.style.borderColor = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div 
                className="mb-3 p-2 rounded-lg inline-flex"
                style={{ 
                  backgroundColor: `${colors.accent}20`, 
                  color: colors.accent 
                }}
              >
                {action.icon}
              </div>
              <h4 className="font-medium" style={{ color: colors.textPrimary }}>
                {action.title}
              </h4>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {action.desc}
              </p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
