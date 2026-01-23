'use client';

import React from 'react';
import VideoDetectionPlayer from '@/components/dashboard/VideoDetectionPlayer';

export default function LiveDetectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🚗 Detección de Parqueo en Vivo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitoreo en tiempo real del parqueadero con detección de vehículos usando YOLO
          </p>
        </div>

        {/* Tarjeta informativa */}
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Sistema de Detección Activo
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  El sistema está procesando el video <strong>parking1.mp4</strong> con detección YOLO.
                  Las zonas de parqueo están configuradas con coordenadas predefinidas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Component */}
        <VideoDetectionPlayer 
          cameraId="mobile"
          showControls={true}
          className="mb-6"
        />

        {/* Información técnica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📋 Especificaciones Técnicas
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Modelo:</strong> YOLOv8s (Small)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Resolución:</strong> 1020x500 pixels</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>FPS:</strong> ~30 frames por segundo</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Zonas:</strong> 12 espacios de parqueo configurados</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Detección:</strong> car, truck, bus, motorcycle</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🎨 Leyenda de Colores
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Espacio Libre - Disponible para estacionar
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Espacio Ocupado - Vehículo detectado
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Bounding Box - Vehículo detectado por YOLO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            💡 Instrucciones de Uso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Controles de Video:</h4>
              <ul className="space-y-1">
                <li>• <strong>Reproducir:</strong> Inicia o reanuda el video</li>
                <li>• <strong>Pausar:</strong> Detiene temporalmente el video</li>
                <li>• <strong>Reiniciar:</strong> Vuelve al inicio del video</li>
                <li>• <strong>Pantalla Completa:</strong> Expande el video</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Monitoreo:</h4>
              <ul className="space-y-1">
                <li>• Los datos se actualizan cada 2 segundos</li>
                <li>• El sistema detecta automáticamente vehículos</li>
                <li>• Las zonas cambian de color según ocupación</li>
                <li>• El porcentaje de ocupación se calcula en tiempo real</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
