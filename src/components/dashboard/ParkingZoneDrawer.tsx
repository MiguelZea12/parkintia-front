'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ParkingZone } from '@/types/parking';

interface ParkingZoneDrawerProps {
  imageUrl: string;
  onZonesCreated: (zones: Array<Omit<ParkingZone, 'id' | 'isOccupied'>>) => void;
  existingZones?: ParkingZone[];
}

interface Point {
  x: number;
  y: number;
}

interface Zone {
  spaceNumber: number;
  name: string;
  coordinates: Point[];
  isComplete: boolean;
}

export default function ParkingZoneDrawer({ 
  imageUrl, 
  onZonesCreated,
  existingZones = []
}: ParkingZoneDrawerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [currentZone, setCurrentZone] = useState<Point[]>([]);
  const [nextSpaceNumber, setNextSpaceNumber] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);

  // Cargar imagen
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      drawCanvas(img, zones, currentZone);
    };
  }, [imageUrl]);

  // Cargar zonas existentes
  useEffect(() => {
    if (existingZones.length > 0) {
      const loadedZones = existingZones.map(zone => ({
        spaceNumber: zone.spaceNumber,
        name: zone.name,
        coordinates: zone.coordinates,
        isComplete: true,
      }));
      setZones(loadedZones);
      setNextSpaceNumber(Math.max(...existingZones.map(z => z.spaceNumber)) + 1);
    }
  }, [existingZones]);

  // Redibujar cuando cambien las zonas
  useEffect(() => {
    if (image) {
      drawCanvas(image, zones, currentZone);
    }
  }, [zones, currentZone, image]);

  const drawCanvas = (img: HTMLImageElement, completedZones: Zone[], currentPoints: Point[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar canvas al tamaño de la imagen
    canvas.width = img.width;
    canvas.height = img.height;

    // Dibujar imagen
    ctx.drawImage(img, 0, 0);

    // Dibujar zonas completadas
    completedZones.forEach((zone) => {
      const color = zone.isComplete ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)';
      const borderColor = zone.isComplete ? '#00ff00' : '#ffff00';

      // Rellenar polígono
      ctx.fillStyle = color;
      ctx.beginPath();
      zone.coordinates.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.fill();

      // Borde
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Número de espacio
      if (zone.coordinates.length > 0) {
        const firstPoint = zone.coordinates[0];
        ctx.fillStyle = borderColor;
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`#${zone.spaceNumber}`, firstPoint.x, firstPoint.y - 10);
      }

      // Puntos
      zone.coordinates.forEach((point) => {
        ctx.fillStyle = borderColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    });

    // Dibujar zona actual en progreso
    if (currentPoints.length > 0) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      currentPoints.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();

      // Puntos
      currentPoints.forEach((point) => {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setCurrentZone([...currentZone, { x, y }]);
  };

  const startNewZone = () => {
    setIsDrawing(true);
    setCurrentZone([]);
  };

  const completeCurrentZone = () => {
    if (currentZone.length < 3) {
      alert('Necesitas al menos 3 puntos para crear una zona');
      return;
    }

    const newZone: Zone = {
      spaceNumber: nextSpaceNumber,
      name: `Space ${nextSpaceNumber}`,
      coordinates: currentZone,
      isComplete: true,
    };

    setZones([...zones, newZone]);
    setCurrentZone([]);
    setNextSpaceNumber(nextSpaceNumber + 1);
    setIsDrawing(false);
  };

  const undoLastPoint = () => {
    if (currentZone.length > 0) {
      setCurrentZone(currentZone.slice(0, -1));
    }
  };

  const deleteZone = (index: number) => {
    const newZones = zones.filter((_, i) => i !== index);
    setZones(newZones);
  };

  const clearAll = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todas las zonas?')) {
      setZones([]);
      setCurrentZone([]);
      setNextSpaceNumber(1);
      setIsDrawing(false);
    }
  };

  const saveZones = () => {
    if (zones.length === 0) {
      alert('No hay zonas para guardar');
      return;
    }

    if (isDrawing) {
      alert('Completa la zona actual antes de guardar');
      return;
    }

    const zonesToSave = zones.map(zone => ({
      spaceNumber: zone.spaceNumber,
      name: zone.name,
      coordinates: zone.coordinates,
    }));

    onZonesCreated(zonesToSave);
  };

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="max-w-full h-auto cursor-crosshair"
        />
      </div>

      {/* Controles */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={startNewZone}
          disabled={isDrawing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isDrawing ? 'Dibujando...' : 'Nueva Zona'}
        </button>

        {isDrawing && (
          <>
            <button
              onClick={completeCurrentZone}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Completar Zona
            </button>
            <button
              onClick={undoLastPoint}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Deshacer Punto
            </button>
          </>
        )}

        <button
          onClick={saveZones}
          disabled={zones.length === 0 || isDrawing}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Guardar Zonas ({zones.length})
        </button>

        <button
          onClick={clearAll}
          disabled={zones.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Limpiar Todo
        </button>
      </div>

      {/* Instrucciones */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Instrucciones:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Haz clic en &quot;Nueva Zona&quot; para empezar a dibujar</li>
          <li>Haz clic en el canvas para agregar puntos (mínimo 3)</li>
          <li>Haz clic en &quot;Completar Zona&quot; cuando termines el polígono</li>
          <li>Repite para crear más zonas de estacionamiento</li>
          <li>Haz clic en &quot;Guardar Zonas&quot; cuando termines</li>
        </ol>
      </div>

      {/* Lista de zonas */}
      {zones.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Zonas creadas:</h3>
          <ul className="space-y-2">
            {zones.map((zone, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  #{zone.spaceNumber} - {zone.name} ({zone.coordinates.length} puntos)
                </span>
                <button
                  onClick={() => deleteZone(index)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
