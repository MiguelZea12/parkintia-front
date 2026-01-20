'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { COLORS } from '@/config/colors';

interface Report {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  generatedDate: string;
  status: 'completed' | 'generating' | 'failed';
  size: string;
  downloadUrl?: string;
}

const mockReports: Report[] = [
  {
    id: 'rep-001',
    name: 'Reporte Diario - Enero 18, 2025',
    type: 'daily',
    generatedDate: '2025-01-18 09:00',
    status: 'completed',
    size: '2.3 MB'
  },
  {
    id: 'rep-002',
    name: 'Reporte Semanal - Semana 3',
    type: 'weekly',
    generatedDate: '2025-01-17 18:30',
    status: 'completed',
    size: '8.7 MB'
  },
  {
    id: 'rep-003',
    name: 'Reporte de Ingresos - Enero',
    type: 'monthly',
    generatedDate: '2025-01-17 15:45',
    status: 'generating',
    size: '-'
  }
];

const ReportCard: React.FC<{ report: Report; onDownload: (report: Report) => void; onDelete: (id: string) => void }> = ({
  report,
  onDownload,
  onDelete
}) => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'generating': return '#F59E0B';
      case 'failed': return '#EF4444';
      default: return COLORS.light.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'generating': return 'Generando...';
      case 'failed': return 'Error';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'weekly':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'monthly':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${COLORS.light.accent}20`, color: COLORS.light.accent }}
          >
            {getTypeIcon(report.type)}
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: COLORS.light.textPrimary }}>
              {report.name}
            </h3>
            <p className="text-sm" style={{ color: COLORS.light.textSecondary }}>
              {t('dailyReport')} • {report.size}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {report.status === 'completed' && (
            <button
              onClick={() => onDownload(report)}
              className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
              style={{ color: COLORS.light.textSecondary }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => onDelete(report.id)}
            className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            style={{ color: COLORS.light.textSecondary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: COLORS.light.textSecondary }}>
          {report.generatedDate}
        </span>
        <div className="flex items-center space-x-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getStatusColor(report.status) }}
          />
          <span 
            className="text-xs font-medium"
            style={{ color: getStatusColor(report.status) }}
          >
            {getStatusText(report.status)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export const ReportsModule: React.FC = () => {
  const { t } = useLanguage();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('daily');

  const handleDownload = (report: Report) => {
    // Simular descarga
    console.log('Descargando reporte:', report.name);
  };

  const handleDelete = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleGenerate = () => {
    const newReport: Report = {
      id: `rep-${Date.now()}`,
      name: `Nuevo Reporte - ${new Date().toLocaleDateString()}`,
      type: selectedReportType as any,
      generatedDate: new Date().toLocaleString(),
      status: 'generating',
      size: '-'
    };
    
    setReports([newReport, ...reports]);
    setShowGenerateForm(false);
    
    // Simular generación completada después de 3 segundos
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'completed' as const, size: '1.5 MB' }
          : r
      ));
    }, 3000);
  };

  const completedReports = reports.filter(r => r.status === 'completed').length;
  const generatingReports = reports.filter(r => r.status === 'generating').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.light.textPrimary }}>
            {t('reportsManagement')}
          </h1>
          <p className="text-lg mt-1" style={{ color: COLORS.light.textSecondary }}>
            {completedReports} reportes completados • {generatingReports} generando
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowGenerateForm(true)}
          style={{ 
            background: COLORS.light.accent 
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('generateReport')}
        </Button>
      </div>

      {/* Quick Generate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            type: 'daily', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ), 
            color: '#10B981' 
          },
          { 
            type: 'weekly', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ), 
            color: '#3B82F6' 
          },
          { 
            type: 'monthly', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ), 
            color: '#8B5CF6' 
          },
          { 
            type: 'custom', 
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ), 
            color: '#F59E0B' 
          }
        ].map((reportType) => (
          <Card 
            key={reportType.type}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
          >
            <div 
              onClick={() => {
                setSelectedReportType(reportType.type);
                setShowGenerateForm(true);
              }}
              className="text-center"
            >
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: `${reportType.color}20`,
                  color: reportType.color
                }}
              >
                {reportType.icon}
              </div>
              <h3 className="font-semibold mb-1" style={{ color: COLORS.light.textPrimary }}>
                {reportType.type === 'daily' ? t('dailyReport') : 
                 reportType.type === 'weekly' ? t('weeklyReport') :
                 reportType.type === 'monthly' ? t('monthlyReport') :
                 t('customReport')}
              </h3>
              <p className="text-sm" style={{ color: COLORS.light.textSecondary }}>
                Generar {reportType.type === 'daily' ? t('dailyReport').toLowerCase() : 
                         reportType.type === 'weekly' ? t('weeklyReport').toLowerCase() :
                         reportType.type === 'monthly' ? t('monthlyReport').toLowerCase() :
                         t('customReport').toLowerCase()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.light.textPrimary }}>
            Estadísticas de Reportes
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span style={{ color: COLORS.light.textSecondary }}>Reportes generados este mes</span>
              <span className="font-semibold" style={{ color: COLORS.light.textPrimary }}>24</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: COLORS.light.textSecondary }}>Reportes descargados</span>
              <span className="font-semibold" style={{ color: COLORS.light.textPrimary }}>18</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: COLORS.light.textSecondary }}>Tamaño promedio</span>
              <span className="font-semibold" style={{ color: COLORS.light.textPrimary }}>3.2 MB</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: COLORS.light.textSecondary }}>Tiempo promedio de generación</span>
              <span className="font-semibold" style={{ color: COLORS.light.textPrimary }}>2.5 min</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.light.textPrimary }}>
            Tipos de Reportes Populares
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Reporte Diario', percentage: 45, color: '#10B981' },
              { name: 'Reporte de Ingresos', percentage: 30, color: '#3B82F6' },
              { name: 'Reporte de Ocupación', percentage: 15, color: '#8B5CF6' },
              { name: 'Reportes Personalizados', percentage: 10, color: '#F59E0B' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: COLORS.light.textPrimary }}>
                      {item.name}
                    </span>
                    <span className="text-sm" style={{ color: COLORS.light.textSecondary }}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div 
                    className="w-full bg-gray-200 rounded-full h-2"
                  >
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: COLORS.light.textPrimary }}>
            Reportes Recientes
          </h3>
          <div className="flex space-x-3">
            <select 
              className="px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: COLORS.light.border }}
            >
              <option>Todos los tipos</option>
              <option>Diarios</option>
              <option>Semanales</option>
              <option>Mensuales</option>
            </select>
            <select 
              className="px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: COLORS.light.border }}
            >
              <option>Todos los estados</option>
              <option>Completados</option>
              <option>Generando</option>
              <option>Error</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Card>

      {/* Generate Report Modal */}
      {showGenerateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.light.textPrimary }}>
                {t('generateReport')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    Tipo de Reporte
                  </label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl"
                    style={{ borderColor: COLORS.light.border }}
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                  >
                    <option value="daily">{t('dailyReport')}</option>
                    <option value="weekly">{t('weeklyReport')}</option>
                    <option value="monthly">{t('monthlyReport')}</option>
                    <option value="custom">{t('customReport')}</option>
                  </select>
                </div>
                
                {selectedReportType === 'custom' && (
                  <>
                    <Input
                      type="date"
                      label="Fecha de inicio"
                      fullWidth
                    />
                    <Input
                      type="date"
                      label="Fecha de fin"
                      fullWidth
                    />
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    Formato
                  </label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl"
                    style={{ borderColor: COLORS.light.border }}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowGenerateForm(false)}
                  fullWidth
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleGenerate}
                  style={{ background: COLORS.light.accent }}
                  fullWidth
                >
                  {t('generateReport')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
