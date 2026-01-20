'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { COLORS } from '@/config/colors';
import { cameraService, CameraData, CameraStats } from '@/services/camera.service';
import { parkingService } from '@/services/parking.service';
import VideoPlayer from '@/components/ui/VideoPlayer';
import VideoModal from '@/components/ui/VideoModal';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  isActive: boolean;
  lastActivity: string;
  stream?: string;
  // Nuevos campos para datos reales
  occupiedSpaces?: number;
  emptySpaces?: number;
  totalSpaces?: number;
  occupancyRate?: number;
}

const mockCameras: Camera[] = [
  {
    id: 'cam-01',
    name: 'Cámara 01',
    location: 'Zona Principal',
    status: 'online',
    isActive: true,
    lastActivity: '2 min ago',
    stream: 'http://localhost:4000/camera/video-feed?cameraId=cam-01',
    totalSpaces: 12,
    emptySpaces: 8,
    occupiedSpaces: 4,
    occupancyRate: 33.3
  },
  {
    id: 'cam-08',
    name: 'Cámara 08',
    location: 'Zona Secundaria',
    status: 'online',
    isActive: true,
    lastActivity: '1 min ago',
    stream: 'http://localhost:4000/camera/video-feed?cameraId=cam-08',
    totalSpaces: 12,
    emptySpaces: 6,
    occupiedSpaces: 6,
    occupancyRate: 50.0
  }
];

const CameraCard: React.FC<{ 
  camera: Camera; 
  onEdit: (camera: Camera) => void; 
  onDelete: (id: string) => void;
  onViewVideo: (camera: Camera) => void;
  onStatsUpdate?: (stats: any) => void; // Nuevo callback
}> = ({
  camera,
  onEdit,
  onDelete,
  onViewVideo,
  onStatsUpdate
}) => {
  const { t } = useLanguage();
  const [liveStats, setLiveStats] = useState<any>(null);

  useEffect(() => {
    // Cargar estadísticas en vivo si la cámara está online
    if (camera.status === 'online') {
      loadLiveStats();
      const interval = setInterval(loadLiveStats, 3000); // Actualizar cada 3 segundos
      return () => clearInterval(interval);
    }
  }, [camera.id, camera.status]);

  const loadLiveStats = async () => {
    try {
      const stats = await parkingService.getParkingStatusLive(camera.id);
      setLiveStats(stats);
      // Notificar al componente padre inmediatamente
      if (onStatsUpdate && stats) {
        console.log('📊 Actualizando stats globales:', stats.occupiedSpaces, '/', stats.totalSpaces);
        onStatsUpdate(stats);
      }
    } catch (error) {
      console.error('Error loading live stats:', error);
    }
  };

  // Actualizar stats al padre cuando cambien los liveStats
  useEffect(() => {
    if (liveStats && onStatsUpdate) {
      console.log('📈 Stats actualizadas via useEffect:', liveStats.occupiedSpaces);
      onStatsUpdate(liveStats);
    }
  }, [liveStats]);

  const displayStats = liveStats || {
    totalSpaces: camera.totalSpaces || 12,
    occupiedSpaces: camera.occupiedSpaces || 0,
    freeSpaces: camera.emptySpaces || 12,
    occupancyRate: camera.occupancyRate || 0
  };

  const occupancyPercentage = displayStats.totalSpaces > 0 
    ? (displayStats.occupiedSpaces / displayStats.totalSpaces) * 100 
    : 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className={`w-3 h-3 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <div>
            <h3 className="font-semibold" style={{ color: COLORS.light.textPrimary }}>
              {camera.name}
            </h3>
            <p className="text-sm" style={{ color: COLORS.light.textSecondary }}>
              {camera.location}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewVideo(camera)}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            style={{ color: COLORS.light.accent }}
            title="Ver en pantalla completa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(camera)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: COLORS.light.accent }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(camera.id)}
            className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            style={{ color: COLORS.light.textSecondary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Camera Preview */}
      <div 
        className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-black cursor-pointer"
        style={{ backgroundColor: `${COLORS.light.border}10` }}
        onClick={() => onViewVideo(camera)}
      >
        <VideoPlayer 
          isOnline={camera.status === 'online'} 
          cameraName={camera.name}
          cameraId={camera.id}
          className="rounded-lg"
        />
      </div>

      {/* Camera Info */}
      <div className="space-y-3">
        {/* Estadísticas de ocupación */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: COLORS.light.textPrimary }}>
              Ocupación del Parking
            </span>
            <span className="text-sm font-bold" style={{ color: COLORS.light.accent }}>
              {occupancyPercentage.toFixed(1)}%
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-red-600">{displayStats.occupiedSpaces}</div>
              <div style={{ color: COLORS.light.textSecondary }}>Ocupados</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-600">{displayStats.freeSpaces}</div>
              <div style={{ color: COLORS.light.textSecondary }}>Libres</div>
            </div>
            <div className="text-center">
              <div className="font-semibold" style={{ color: COLORS.light.textPrimary }}>{displayStats.totalSpaces}</div>
              <div style={{ color: COLORS.light.textSecondary }}>Total</div>
            </div>
          </div>
          
          {/* Barra de progreso */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${occupancyPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span style={{ color: COLORS.light.textSecondary }}>
            {t('lastLogin')}: {camera.lastActivity}
          </span>
          <span 
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              camera.status === 'online' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {t(camera.status)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export const CamerasModule: React.FC = () => {
  const { t } = useLanguage();
  const [cameras, setCameras] = useState<Camera[]>(mockCameras);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [cameraData, setCameraData] = useState<CameraData[]>([]);
  const [cameraStats, setCameraStats] = useState<CameraStats>({
    totalSpaces: 12,
    occupiedSpaces: 0,
    emptySpaces: 12,
    occupancyRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // Callback para actualizar estadísticas globales desde las CameraCards
  const handleStatsUpdate = (stats: any) => {
    console.log('🎯 handleStatsUpdate llamado con:', stats);
    if (stats) {
      const newStats = {
        totalSpaces: stats.totalSpaces || 12,
        occupiedSpaces: stats.occupiedSpaces || 0,
        emptySpaces: stats.freeSpaces || 12,
        occupancyRate: stats.totalSpaces > 0 
          ? (stats.occupiedSpaces / stats.totalSpaces) * 100 
          : 0
      };
      console.log('✅ Actualizando cameraStats a:', newStats);
      setCameraStats(newStats);
    }
  };
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'online' as 'online' | 'offline',
    videoFile: '',
    streamUrl: ''
  });

  // Cargar datos de las cámaras al montar el componente
  useEffect(() => {
    // Usar solo datos mock - no intentar conectar al backend
    setCameras(mockCameras);
    
    // Calcular estadísticas mock
    const totalSpaces = mockCameras.reduce((sum, cam) => sum + (cam.totalSpaces || 12), 0);
    const occupiedSpaces = mockCameras.reduce((sum, cam) => sum + (cam.occupiedSpaces || 0), 0);
    
    setCameraStats({
      totalSpaces,
      occupiedSpaces,
      emptySpaces: totalSpaces - occupiedSpaces,
      occupancyRate: totalSpaces > 0 ? (occupiedSpaces / totalSpaces) * 100 : 0
    });
    
    setLastUpdate(new Date().toLocaleTimeString());
    setLoading(false);
  }, []);

  // Cargar estadísticas en vivo desde la primera cámara activa
  const loadLiveStats = async (cameraId?: string) => {
    try {
      // Usar el ID de cámara proporcionado o buscar la primera cámara
      const targetCameraId = cameraId || cameras[0]?.id || 'default';
      const stats = await parkingService.getParkingStatusLive(targetCameraId);
      const totalSpaces = stats.totalSpaces || 12;
      const occupiedSpaces = stats.occupiedSpaces || 0;
      const freeSpaces = stats.freeSpaces || totalSpaces;
      const occupancyRate = totalSpaces > 0 
        ? (occupiedSpaces / totalSpaces) * 100 
        : 0;
      
      setCameraStats({
        totalSpaces,
        occupiedSpaces,
        emptySpaces: freeSpaces,
        occupancyRate
      });
    } catch (error) {
      console.error('Error loading live stats:', error);
      // Mantener valores por defecto si hay error
      setCameraStats({
        totalSpaces: 12,
        occupiedSpaces: 0,
        emptySpaces: 12,
        occupancyRate: 0
      });
    }
  };

  // Manejar tecla ESC para cerrar modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showVideoModal) {
        handleCloseVideoModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showVideoModal]);

  // Función para recargar datos mock (no intenta conectar al backend)
  const loadCameraData = () => {
    setLoading(true);
    setCameras(mockCameras);
    
    // Calcular estadísticas mock
    const totalSpaces = mockCameras.reduce((sum, cam) => sum + (cam.totalSpaces || 12), 0);
    const occupiedSpaces = mockCameras.reduce((sum, cam) => sum + (cam.occupiedSpaces || 0), 0);
    
    setCameraStats({
      totalSpaces,
      occupiedSpaces,
      emptySpaces: totalSpaces - occupiedSpaces,
      occupancyRate: totalSpaces > 0 ? (occupiedSpaces / totalSpaces) * 100 : 0
    });
    
    setLastUpdate(new Date().toLocaleTimeString());
    setLoading(false);
  };

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCameras = cameras.filter(camera => camera.status === 'online');
  const inactiveCameras = cameras.filter(camera => camera.status === 'offline');

  const handleEdit = (camera: Camera) => {
    setEditingCamera(camera);
    setFormData({
      name: camera.name,
      location: camera.location,
      status: camera.status,
      videoFile: '',
      streamUrl: ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta cámara?')) return;
    
    // Eliminar de la lista local (solo datos mock)
    setCameras(prevCameras => prevCameras.filter(cam => cam.id !== id));
    
    // Recalcular estadísticas
    const remainingCameras = cameras.filter(cam => cam.id !== id);
    const totalSpaces = remainingCameras.reduce((sum, cam) => sum + (cam.totalSpaces || 12), 0);
    const occupiedSpaces = remainingCameras.reduce((sum, cam) => sum + (cam.occupiedSpaces || 0), 0);
    
    setCameraStats({
      totalSpaces,
      occupiedSpaces,
      emptySpaces: totalSpaces - occupiedSpaces,
      occupancyRate: totalSpaces > 0 ? (occupiedSpaces / totalSpaces) * 100 : 0
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Por favor ingresa el nombre de la cámara');
      return;
    }
    
    if (!formData.location.trim()) {
      alert('Por favor ingresa la ubicación/descripción');
      return;
    }
    
    if (!formData.videoFile.trim()) {
      alert('Por favor ingresa el archivo de video (ej: parking1.mp4)');
      return;
    }

    try {
      // Actualizar solo datos locales (no intentar conectar al backend)
      if (editingCamera) {
      // Editar cámara existente
      setCameras(prevCameras => prevCameras.map(cam => 
        cam.id === editingCamera.id 
          ? { 
              ...cam, 
              name: formData.name.trim(), 
              location: formData.location.trim(), 
              status: formData.status,
              isActive: formData.status === 'online',
              stream: formData.streamUrl.trim() || cam.stream
            }
          : cam
      ));
    } else {
      // Agregar nueva cámara (pero limitar a solo las dos cámaras permitidas)
      if (cameras.length >= 2) {
        alert('Solo se permiten 2 cámaras: cam-01 y cam-08');
        return;
      }
      
      const newCamera: Camera = {
        id: formData.name.toLowerCase().includes('01') ? 'cam-01' : 
            formData.name.toLowerCase().includes('08') ? 'cam-08' : 
            `cam-${Date.now()}`,
        name: formData.name.trim(),
        location: formData.location.trim(),
        status: formData.status,
        isActive: formData.status === 'online',
        lastActivity: 'Just now',
        stream: formData.streamUrl.trim() || `http://localhost:4000/camera/video-feed?cameraId=${formData.name.toLowerCase().includes('01') ? 'cam-01' : 'cam-08'}`,
        totalSpaces: 12,
        emptySpaces: 12,
        occupiedSpaces: 0,
        occupancyRate: 0
      };
      setCameras(prevCameras => [...prevCameras, newCamera]);
    }

      // Resetear formulario
      setFormData({ name: '', location: '', status: 'online', videoFile: '', streamUrl: '' });
      setShowAddForm(false);
      setEditingCamera(null);
    } catch (error) {
      console.error('Error saving camera:', error);
      alert('Error al guardar la cámara');
    }
  };

  const handleOpenAddForm = () => {
    setFormData({ name: '', location: '', status: 'online', videoFile: '', streamUrl: '' });
    setEditingCamera(null);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setFormData({ name: '', location: '', status: 'online', videoFile: '', streamUrl: '' });
    setShowAddForm(false);
    setEditingCamera(null);
  };

  const handleViewVideo = (camera: Camera) => {
    setSelectedCamera(camera);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setSelectedCamera(null);
    setShowVideoModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.light.textPrimary }}>
            {t('cameraManagement')}
          </h1>
          <p className="text-lg mt-1" style={{ color: COLORS.light.textSecondary }}>
            {loading 
              ? 'Cargando datos...' 
              : `Ocupación: ${cameraStats.occupiedSpaces || 0}/${cameraStats.totalSpaces || 12} espacios (${(cameraStats.occupancyRate || 0).toFixed(1)}%)`
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={loadCameraData}
            disabled={loading}
            style={{ 
              borderColor: COLORS.light.accent,
              color: COLORS.light.accent 
            }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
          <Button
            variant="primary"
            onClick={handleOpenAddForm}
            style={{ 
              background: COLORS.light.accent 
            }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('addCamera')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.light.textSecondary }}>
                Espacios Ocupados
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.light.textPrimary }}>
                {loading ? '...' : (cameraStats.occupiedSpaces || 0)}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: '#10B98120', color: '#10B981' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.light.textSecondary }}>
                Espacios Libres
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.light.textPrimary }}>
                {loading ? '...' : (cameraStats.emptySpaces || 12)}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: '#3B82F620', color: '#3B82F6' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.light.textSecondary }}>
                Total Espacios
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.light.textPrimary }}>
                {loading ? '...' : (cameraStats.totalSpaces || 12)}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: `${COLORS.light.accent}20`, color: COLORS.light.accent }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.light.textSecondary }}>
                Tasa Ocupación
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.light.textPrimary }}>
                {loading ? '...' : `${(cameraStats.occupancyRate || 0).toFixed(1)}%`}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ 
                backgroundColor: (cameraStats.occupancyRate || 0) > 80 ? '#EF444420' : '#F59E0B20', 
                color: (cameraStats.occupancyRate || 0) > 80 ? '#EF4444' : '#F59E0B' 
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Información de actualización */}
      {lastUpdate && (
        <Card className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span style={{ color: COLORS.light.textSecondary }}>
                Datos en tiempo real - Última actualización: {lastUpdate}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              {cameraData.length > 0 && (
                <>
                  <span style={{ color: COLORS.light.textSecondary }}>
                    Datos del video: {cameraData[cameraData.length - 1]?.time_video_sg}
                  </span>
                  <span style={{ color: COLORS.light.textSecondary }}>
                    Total registros: {cameraData.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
          <select 
            className="px-4 py-2 border rounded-lg"
            style={{ borderColor: COLORS.light.border }}
          >
            <option value="">Todos los estados</option>
            <option value="online">{t('online')}</option>
            <option value="offline">{t('offline')}</option>
          </select>
        </div>
      </Card>

      {/* Cameras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCameras.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewVideo={handleViewVideo}
            onStatsUpdate={handleStatsUpdate}
          />
        ))}
      </div>

      {filteredCameras.length === 0 && (
        <Card className="p-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.light.textSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
            No se encontraron cámaras
          </h3>
          <p style={{ color: COLORS.light.textSecondary }}>
            Intenta con otro término de búsqueda o agrega una nueva cámara.
          </p>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.light.textPrimary }}>
                {editingCamera ? t('editCamera') : t('addCamera')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    Nombre de la Cámara *
                  </label>
                  <Input
                    type="text"
                    placeholder="Ej: Parking Demo"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    fullWidth
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    Ubicación/Descripción *
                  </label>
                  <Input
                    type="text"
                    placeholder="Ej: Zona C - Sur"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    fullWidth
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    Archivo de Video *
                  </label>
                  <Input
                    type="text"
                    placeholder="parking1.mp4"
                    value={formData.videoFile}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoFile: e.target.value }))}
                    fullWidth
                  />
                  <p className="text-xs mt-1" style={{ color: COLORS.light.textSecondary }}>
                    Debe estar en python-detection-service/
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    URL del Stream (opcional)
                  </label>
                  <Input
                    type="text"
                    placeholder="http://..."
                    value={formData.streamUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, streamUrl: e.target.value }))}
                    fullWidth
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.light.textPrimary }}>
                    Estado
                  </label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl"
                    style={{ borderColor: COLORS.light.border }}
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'online' | 'offline' }))}
                  >
                    <option value="online">{t('online')}</option>
                    <option value="offline">{t('offline')}</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={handleCloseForm}
                  fullWidth
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  style={{ background: COLORS.light.accent }}
                  fullWidth
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={handleCloseVideoModal}
        cameraName={selectedCamera?.name || ''}
        cameraLocation={selectedCamera?.location || ''}
        isOnline={selectedCamera?.status === 'online'}
        cameraId={selectedCamera?.id || 'default'}
      />
    </div>
  );
};
