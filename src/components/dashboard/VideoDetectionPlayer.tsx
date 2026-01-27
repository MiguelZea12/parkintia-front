'use client';

import React, { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { parkingService } from '@/services/parking.service';
import { Camera } from '@/types/parking';

interface VideoDetectionPlayerProps {
  cameraId?: string;
  showControls?: boolean;
  className?: string;
}

export default function VideoDetectionPlayer({ 
  cameraId = 'default', 
  showControls = true,
  className = '' 
}: VideoDetectionPlayerProps) {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [activeCameraId, setActiveCameraId] = useState<string>(cameraId);

  useEffect(() => {
    let mounted = true;

    const initializePlayer = async () => {
      let currentCameraId = cameraId;
      let currentStreamUrl = '';

      // Si es default, buscar la primera cámara activa
      if (cameraId === 'default') {
        try {
          const cameras = await parkingService.getCameras();
          const activeCamera = cameras.find(c => c.isActive);
          
          if (activeCamera && mounted) {
            currentCameraId = activeCamera.id;
            setActiveCameraId(activeCamera.id);
            // Usar getStreamUrl para manejar correctamente el mapeo de videoSource (ej. 'mobile')
            currentStreamUrl = parkingService.getStreamUrl(activeCamera.id, activeCamera.streamUrl || activeCamera.videoFile || '');
          }
        } catch (err) {
          console.error('Error finding active camera:', err);
        }
      } else {
        // Si no es default, obtener la cámara para saber su source correcto si es posible
        // O intentar usar la URL directa
         currentStreamUrl = parkingService.getVideoFeedUrl(cameraId);
      }

      if (mounted) {
        // Si no obtuvimos URL por el método de cámara activa, usar el fallback
        if (!currentStreamUrl) {
           currentStreamUrl = parkingService.getVideoFeedUrl(currentCameraId);
        }
        setStreamUrl(currentStreamUrl);
        
        // Cargar estado inicial
        fetchStatus(currentCameraId);
      }
    };

    initializePlayer();

    // Obtener estado cada 2 segundos
    const interval = setInterval(() => {
        if (activeCameraId && activeCameraId !== 'default') {
            fetchStatus(activeCameraId);
        } else if (cameraId !== 'default') {
            fetchStatus(cameraId);
        }
    }, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [cameraId, activeCameraId]); // Dependencia de activeCameraId para reajustar si cambia

  const fetchStatus = async (id: string) => {
    try {
      // Usar getParkingStatus para aprovechar la lógica de fallback a Python
      // Si tenemos el activeCameraId, intentamos obtener su status
      // Nota: getParkingStatusLive usa 'default' o ID, pero getParkingStatus es más robusto si tenemos el objeto
      
      // Intentamos primero el endpoint live que soporta redirección
      const data = await parkingService.getParkingStatusLive(id);
      setStatus(data);
    } catch (err) {
      console.error('Error fetching status:', err);
    }
  };

  const handleFullscreen = () => {
    const videoElement = document.getElementById('parking-video-stream');
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Estadísticas principales */}
      {status && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Total Espacios
            </div>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">
              {status.totalSpaces || 0}
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              Libres
            </div>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">
              {status.freeSpaces || 0}
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="text-sm font-medium text-red-600 dark:text-red-400">
              Ocupados
            </div>
            <div className="text-3xl font-bold text-red-900 dark:text-red-100 mt-1">
              {status.occupiedSpaces || 0}
            </div>
          </div>
        </div>
      )}

      {/* Video Stream */}
      <div className="relative bg-black rounded-lg overflow-hidden shadow-xl">
        <img
          id="parking-video-stream"
          src={streamUrl}
          alt="Parking Detection Live Stream"
          className="w-full h-auto"
          onError={(e) => {
            console.error('Error loading video stream from:', streamUrl);
            setError('Error al cargar el stream de video. Asegúrate de que el servicio Python esté ejecutándose y la cámara configurada.');
          }}
        />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center p-6">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-white text-sm">{error}</p>
              <button
                onClick={() => {
                  setError('');
                  window.location.reload();
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controles del video */}
      {showControls && (
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            onClick={handleFullscreen}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors gap-2"
          >
            <Maximize2 size={16} />
            <span>Pantalla Completa</span>
          </button>
        </div>
      )}

      {/* Estado de espacios en grid */}
      {status && status.spaces && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Estado de Espacios de Parqueo
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {status.spaces.map((space: any) => (
              <div
                key={space.id}
                className={`
                  p-3 rounded-lg text-center font-medium transition-all duration-200
                  ${space.isOccupied 
                    ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 border-2 border-red-300 dark:border-red-700' 
                    : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 border-2 border-green-300 dark:border-green-700'}
                `}
              >
                <div className="text-lg font-bold">#{space.spaceNumber}</div>
                <div className="text-xs mt-1">
                  {space.isOccupied ? 'Ocupado' : 'Libre'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información adicional */}
      {status && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              📹 Cámara: {activeCameraId !== 'default' ? activeCameraId : cameraId}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              🕐 Última actualización: {status.lastUpdate ? new Date(status.lastUpdate * 1000).toLocaleTimeString() : '-'}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              📊 Ocupación: {status.totalSpaces > 0 
                ? Math.round((status.occupiedSpaces / status.totalSpaces) * 100) 
                : 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
