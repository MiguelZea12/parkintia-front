'use client';

import React, { useEffect, useState } from 'react';
import { ParkingStatusSummary } from '@/types/parking';
import { parkingService } from '@/services/parking.service';

interface ParkingLiveViewProps {
  cameraId: string;
  videoSource: string;
}

export default function ParkingLiveView({ cameraId, videoSource }: ParkingLiveViewProps) {
  const [status, setStatus] = useState<ParkingStatusSummary | null>(null);
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Configurar URL del stream
    const url = parkingService.getStreamUrl(cameraId, videoSource);
    setStreamUrl(url);

    // Obtener estado inicial
    fetchStatus();

    // Actualizar estado cada 2 segundos
    const interval = setInterval(fetchStatus, 2000);

    return () => clearInterval(interval);
  }, [cameraId, videoSource]);

  const fetchStatus = async () => {
    try {
      const data = await parkingService.getParkingStatus(cameraId);
      setStatus(data);
      setIsLoading(false);
    } catch (err) {
      setError('Error al cargar el estado del parqueadero');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando vista en vivo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Estadísticas */}
      {status && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-200">Total de Espacios</h3>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{status.totalSpaces}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-200">Espacios Libres</h3>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{status.freeSpaces}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-600 dark:text-red-200">Espacios Ocupados</h3>
            <p className="text-3xl font-bold text-red-900 dark:text-red-100">{status.occupiedSpaces}</p>
          </div>
        </div>
      )}

      {/* Video Stream */}
      <div className="bg-black rounded-lg overflow-hidden">
        <img
          src={streamUrl}
          alt="Parking Live Stream"
          className="w-full h-auto"
          onError={() => setError('Error al cargar el stream de video')}
        />
      </div>

      {/* Lista de Espacios */}
      {status && status.spaces && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Estado de Espacios</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {status.spaces.map((space) => (
              <div
                key={space.id}
                className={`
                  p-3 rounded-lg text-center font-medium transition-colors
                  ${space.isOccupied 
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}
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
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Última actualización: {status?.lastUpdate ? new Date(status.lastUpdate).toLocaleTimeString() : '-'}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Ocupación: {status ? Math.round((status.occupiedSpaces / status.totalSpaces) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}
