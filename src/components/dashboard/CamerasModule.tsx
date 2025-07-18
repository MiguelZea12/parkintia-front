'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { COLORS } from '@/config/colors';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  isActive: boolean;
  lastActivity: string;
  stream?: string;
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

const CameraCard: React.FC<{ camera: Camera; onEdit: (camera: Camera) => void; onDelete: (id: string) => void }> = ({
  camera,
  onEdit,
  onDelete
}) => {
  const { t } = useLanguage();

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
        className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
        style={{ backgroundColor: `${COLORS.primary.light}10` }}
      >
        {camera.status === 'online' ? (
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.primary.medium }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-xs" style={{ color: COLORS.text.light }}>Live Stream</p>
          </div>
        ) : (
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 21l-3-3m0 0L5.636 5.636M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-xs text-gray-400">Offline</p>
          </div>
        )}
      </div>

      {/* Camera Info */}
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
    </Card>
  );
};

export const CamerasModule: React.FC = () => {
  const { t } = useLanguage();
  const [cameras, setCameras] = useState<Camera[]>(mockCameras);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCameras = cameras.filter(camera => camera.status === 'online');
  const inactiveCameras = cameras.filter(camera => camera.status === 'offline');

  const handleEdit = (camera: Camera) => {
    setEditingCamera(camera);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  const handleSave = () => {
    setShowAddForm(false);
    setEditingCamera(null);
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
            {t('activeCameras')}: {activeCameras.length} / {cameras.length}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(true)}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                {t('activeCameras')}
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
                {activeCameras.length}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: '#10B98120', color: '#10B981' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                {t('inactiveCameras')}
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
                {inactiveCameras.length}
              </p>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: '#EF444420', color: '#EF4444' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 21l-3-3m0 0L5.636 5.636M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.text.light }}>
                Total Cameras
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: COLORS.text.dark }}>
                {cameras.length}
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
      </div>

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
                <Input
                  type="text"
                  placeholder={t('cameraName')}
                  defaultValue={editingCamera?.name}
                  fullWidth
                />
                <Input
                  type="text"
                  placeholder={t('cameraLocation')}
                  defaultValue={editingCamera?.location}
                  fullWidth
                />
                <select 
                  className="w-full px-4 py-3 border rounded-xl"
                  style={{ borderColor: COLORS.primary.light }}
                  defaultValue={editingCamera?.status}
                >
                  <option value="online">{t('online')}</option>
                  <option value="offline">{t('offline')}</option>
                </select>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
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
    </div>
  );
};
