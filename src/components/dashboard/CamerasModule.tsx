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
    id: 'cam-001',
    name: 'Entrada Principal',
    location: 'Zona A - Entrada',
    status: 'online',
    isActive: true,
    lastActivity: '2 min ago'
  },
  {
    id: 'cam-002',
    name: 'Parking Norte',
    location: 'Zona B - Norte',
    status: 'online',
    isActive: true,
    lastActivity: '5 min ago'
  },
  {
    id: 'cam-003',
    name: 'Parking Sur',
    location: 'Zona C - Sur',
    status: 'offline',
    isActive: false,
    lastActivity: '1 hour ago'
  },
  {
    id: 'cam-004',
    name: 'Salida Principal',
    location: 'Zona A - Salida',
    status: 'online',
    isActive: true,
    lastActivity: '1 min ago'
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
            <h3 className="font-semibold" style={{ color: COLORS.text.dark }}>
              {camera.name}
            </h3>
            <p className="text-sm" style={{ color: COLORS.text.light }}>
              {camera.location}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewVideo(camera)}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            style={{ color: COLORS.primary.medium }}
            title="Ver en pantalla completa"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(camera)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: COLORS.primary.medium }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(camera.id)}
            className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            style={{ color: COLORS.text.light }}
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
        style={{ backgroundColor: `${COLORS.primary.light}10` }}
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
            <span className="text-sm font-medium" style={{ color: COLORS.text.dark }}>
              Ocupación del Parking
            </span>
            <span className="text-sm font-bold" style={{ color: COLORS.primary.medium }}>
              {occupancyPercentage.toFixed(1)}%
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-red-600">{displayStats.occupiedSpaces}</div>
              <div style={{ color: COLORS.text.light }}>Ocupados</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-600">{displayStats.freeSpaces}</div>
              <div style={{ color: COLORS.text.light }}>Libres</div>
            </div>
            <div className="text-center">
              <div className="font-semibold" style={{ color: COLORS.text.dark }}>{displayStats.totalSpaces}</div>
              <div style={{ color: COLORS.text.light }}>Total</div>
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
          <span style={{ color: COLORS.text.light }}>
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
  const [cameras, setCameras] = useState<Camera[]>([]);
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
    loadCameraData();
    // Actualizar datos cada 3 segundos para mejor sincronización
    const interval = setInterval(() => {
      loadCameraData();
    }, 3000);
    return () => clearInterval(interval);
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

  const loadCameraData = async () => {
    try {
      // Cargar cámaras reales desde el backend
      const realCameras = await parkingService.getCameras();
      
      // Convertir al formato del componente
      const convertedCameras: Camera[] = realCameras.map((cam: any) => ({
        id: cam.id,
        name: cam.name,
        location: cam.description || 'Sin descripción',
        status: cam.isActive ? 'online' : 'offline',
        isActive: cam.isActive,
        lastActivity: cam.updatedAt ? new Date(cam.updatedAt).toLocaleString() : 'Never',
        occupiedSpaces: 0,
        emptySpaces: cam.total_parking || 0,
        totalSpaces: cam.total_parking || 0,
        occupancyRate: 0
      }));
      
      setCameras(convertedCameras);
      
      // Actualizar estadísticas globales con la primera cámara activa
      if (convertedCameras.length > 0 && convertedCameras[0].status === 'online') {
        await loadLiveStats(convertedCameras[0].id);
      }
      
      // Cargar datos estadísticos legacy
      try {
        const data = await cameraService.getAllCameraData();
        const stats = cameraService.calculateCameraStats(data);
        setCameraData(data);
        setCameraStats(stats);
      } catch (error) {
        console.log('Legacy data not available:', error);
      }
      
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading camera data:', error);
    } finally {
      setLoading(false);
    }
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
    
    try {
      await parkingService.deleteCamera(id);
      await loadCameraData();
    } catch (error) {
      console.error('Error deleting camera:', error);
      alert('Error al eliminar la cámara');
    }
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
      if (editingCamera) {
        // Editar cámara existente
        await parkingService.updateCamera(editingCamera.id, {
          name: formData.name.trim(),
          description: formData.location.trim(),
          videoFile: formData.videoFile.trim(),
          streamUrl: formData.streamUrl.trim(),
          isActive: formData.status === 'online'
        });
      } else {
        // Agregar nueva cámara
        await parkingService.createCamera({
          name: formData.name.trim(),
          description: formData.location.trim(),
          videoFile: formData.videoFile.trim(),
          streamUrl: formData.streamUrl.trim(),
          isActive: formData.status === 'online'
        });
      }

      // Recargar cámaras
      await loadCameraData();

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
          <h1 className="text-3xl font-bold" style={{ color: COLORS.text.dark }}>
            {t('cameraManagement')}
          </h1>
          <p className="text-lg mt-1" style={{ color: COLORS.text.light }}>
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
              borderColor: COLORS.primary.medium,
              color: COLORS.primary.medium 
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
              background: COLORS.gradients.primary 
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
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                Espacios Ocupados
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
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
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                Espacios Libres
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
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
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                Total Espacios
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
                {loading ? '...' : (cameraStats.totalSpaces || 12)}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: `${COLORS.primary.medium}20`, color: COLORS.primary.medium }}
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
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                Tasa Ocupación
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
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
              <span style={{ color: COLORS.text.light }}>
                Datos en tiempo real - Última actualización: {lastUpdate}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              {cameraData.length > 0 && (
                <>
                  <span style={{ color: COLORS.text.light }}>
                    Datos del video: {cameraData[cameraData.length - 1]?.time_video_sg}
                  </span>
                  <span style={{ color: COLORS.text.light }}>
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
            style={{ borderColor: COLORS.primary.light }}
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
          <svg className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.text.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium mb-2" style={{ color: COLORS.text.dark }}>
            No se encontraron cámaras
          </h3>
          <p style={{ color: COLORS.text.light }}>
            Intenta con otro término de búsqueda o agrega una nueva cámara.
          </p>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.text.dark }}>
                {editingCamera ? t('editCamera') : t('addCamera')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
                    Archivo de Video *
                  </label>
                  <Input
                    type="text"
                    placeholder="parking1.mp4"
                    value={formData.videoFile}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoFile: e.target.value }))}
                    fullWidth
                  />
                  <p className="text-xs mt-1" style={{ color: COLORS.text.light }}>
                    Debe estar en python-detection-service/
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
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
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text.dark }}>
                    Estado
                  </label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl"
                    style={{ borderColor: COLORS.primary.light }}
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
                  style={{ background: COLORS.gradients.primary }}
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
