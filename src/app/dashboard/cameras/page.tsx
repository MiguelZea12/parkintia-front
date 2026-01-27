'use client';

import React, { useState, useEffect } from 'react';
import { Camera, ParkingZone } from '@/types/parking';
import { parkingService } from '@/services/parking.service';
import ParkingZoneDrawer from '@/components/dashboard/ParkingZoneDrawer';

export default function CameraManagementPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [mode, setMode] = useState<'list' | 'configure'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [referenceImage, setReferenceImage] = useState<string>('');

  // Estados para crear cámara
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCameraData, setNewCameraData] = useState({
    name: '',
    description: '',
    videoFile: '',
    streamUrl: '',
  });

  useEffect(() => {
    loadCameras();
  }, []);

  const loadCameras = async () => {
    try {
      const data = await parkingService.getCameras();
      setCameras(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading cameras:', error);
      setIsLoading(false);
    }
  };

  const handleCreateCamera = async () => {
    try {
      await parkingService.createCamera(newCameraData);
      setShowCreateForm(false);
      setNewCameraData({ name: '', description: '', videoFile: '', streamUrl: '' });
      loadCameras();
    } catch (error) {
      console.error('Error creating camera:', error);
      alert('Error al crear la cámara');
    }
  };

  const handleSelectCamera = (camera: Camera) => {
    setSelectedCamera(camera);
    setMode('configure');
  };

  const handleZonesCreated = async (zones: Array<Omit<ParkingZone, 'id' | 'isOccupied'>>) => {
    if (!selectedCamera) return;

    try {
      await parkingService.bulkCreateParkingZones(selectedCamera.id, zones);
      alert('Zonas guardadas correctamente');
      loadCameras();
      setMode('list');
    } catch (error) {
      console.error('Error saving zones:', error);
      alert('Error al guardar las zonas');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCamera = async (cameraId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta cámara y todas sus zonas?')) return;

    try {
      await parkingService.deleteCamera(cameraId);
      loadCameras();
      if (selectedCamera?.id === cameraId) {
        setSelectedCamera(null);
        setMode('list');
      }
    } catch (error) {
      console.error('Error deleting camera:', error);
      alert('Error al eliminar la cámara');
    }
  };

  const handleClearZones = async () => {
    if (!selectedCamera) return;
    if (!confirm('¿Estás seguro de eliminar todas las zonas de esta cámara?')) return;

    try {
      await parkingService.deleteAllZones(selectedCamera.id);
      alert('Zonas eliminadas correctamente');
      loadCameras();
    } catch (error) {
      console.error('Error clearing zones:', error);
      alert('Error al eliminar las zonas');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Cámaras</h1>
        {mode !== 'list' && (
          <button
            onClick={() => {
              setMode('list');
              setSelectedCamera(null);
              setReferenceImage('');
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Volver a la lista
          </button>
        )}
      </div>

      {/* LISTA DE CÁMARAS */}
      {mode === 'list' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cámaras Disponibles</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showCreateForm ? 'Cancelar' : '+ Nueva Cámara'}
            </button>
          </div>

          {/* Formulario crear cámara */}
          {showCreateForm && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Crear Nueva Cámara</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre de la cámara"
                  value={newCameraData.name}
                  onChange={(e) => setNewCameraData({ ...newCameraData, name: e.target.value })}
                  className="px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  value={newCameraData.description}
                  onChange={(e) => setNewCameraData({ ...newCameraData, description: e.target.value })}
                  className="px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Ruta del video (opcional)"
                  value={newCameraData.videoFile}
                  onChange={(e) => setNewCameraData({ ...newCameraData, videoFile: e.target.value })}
                  className="px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="URL del stream (opcional)"
                  value={newCameraData.streamUrl}
                  onChange={(e) => setNewCameraData({ ...newCameraData, streamUrl: e.target.value })}
                  className="px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                onClick={handleCreateCamera}
                disabled={!newCameraData.name}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                Crear Cámara
              </button>
            </div>
          )}

          {/* Lista de cámaras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{camera.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {camera.description || 'Sin descripción'}
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <p>
                    <span className="font-medium">Espacios:</span> {camera.total_parking}
                  </p>
                  <p>
                    <span className="font-medium">Estado:</span>{' '}
                    <span className={camera.isActive ? 'text-green-600' : 'text-red-600'}>
                      {camera.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSelectCamera(camera)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Configurar Zonas
                  </button>
                  <button
                    onClick={() => handleDeleteCamera(camera.id)}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cameras.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No hay cámaras configuradas. Crea una nueva para empezar.
            </div>
          )}
        </div>
      )}

      {/* CONFIGURAR ZONAS */}
      {mode === 'configure' && selectedCamera && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Configurar Zonas - {selectedCamera.name}
            </h2>
            
            {selectedCamera.total_parking > 0 && (
              <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded">
                <p className="text-sm">
                  Esta cámara ya tiene {selectedCamera.total_parking} zonas configuradas.
                </p>
                <button
                  onClick={handleClearZones}
                  className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Eliminar todas las zonas
                </button>
              </div>
            )}

            {!referenceImage ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Sube una imagen de referencia del parqueadero para definir las zonas
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block mx-auto"
                />
              </div>
            ) : (
              <ParkingZoneDrawer
                imageUrl={referenceImage}
                onZonesCreated={handleZonesCreated}
                existingZones={selectedCamera.parkingZones}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
