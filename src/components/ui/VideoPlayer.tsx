'use client';

import React, { useEffect, useState } from 'react';

interface VideoPlayerProps {
  isOnline: boolean;
  cameraName: string;
  className?: string;
  cameraId?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  isOnline, 
  cameraName, 
  className,
  cameraId = 'default'
}) => {
  const [streamUrl, setStreamUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOnline) {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const url = `${backendUrl}/camera/video-feed?cameraId=${cameraId}&t=${Date.now()}`;
      setStreamUrl(url);
      setError(false);
    }
  }, [isOnline, cameraId]);

  if (!isOnline) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-200 ${className}`}>
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 21l-3-3m0 0L5.636 5.636M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-xs text-gray-400">Offline</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-800 ${className}`}>
        <div className="text-center text-white p-4">
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs">Error al cargar video</p>
          <p className="text-xs text-gray-400 mt-1">Verifica que el servicio Python esté corriendo</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative group bg-black ${className}`}>
      <img
        src={streamUrl}
        alt={`Stream de ${cameraName}`}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />

      {/* Live indicator */}
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center z-10">
        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
        LIVE
      </div>

      {/* Quality indicator */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm z-10">
        AI
      </div>

      {/* Camera name overlay */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs max-w-[calc(100%-1rem)] truncate backdrop-blur-sm z-10">
        {cameraName}
      </div>
    </div>
  );
};

export default VideoPlayer;
