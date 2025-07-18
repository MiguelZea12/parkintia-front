'use client';

import React, { useRef, useState } from 'react';
import { COLORS } from '@/config/colors';

interface VideoPlayerProps {
  isOnline: boolean;
  cameraName: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ isOnline, cameraName, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Play failed:', error);
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (hasError) return;
    
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const error = video.error;
    
    console.warn(`Video error for camera "${cameraName}":`, {
      error: error?.message,
      code: error?.code,
      networkState: video.networkState,
      readyState: video.readyState,
      currentSrc: video.currentSrc
    });
    
    setHasError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    console.log(`Video loaded successfully for camera "${cameraName}"`);
    setHasError(false);
    setIsLoading(false);
    // Intentar autoplay solo después de que se carga
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const retryVideo = () => {
    setHasError(false);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

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

  if (hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center relative ${className}`}>
        {/* Imagen de placeholder como fallback */}
        <img 
          src="/camera-placeholder.svg" 
          alt={`Vista de cámara ${cameraName}`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay con información de error */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5C3.546 18.333 4.508 20 6.048 20z" />
              </svg>
            </div>
            <p className="text-xs font-medium">Video no disponible</p>
            <button
              onClick={retryVideo}
              className="mt-2 px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
        
        {/* Camera name overlay */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {cameraName}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs" style={{ color: COLORS.text.light }}>Cargando video...</p>
          <p className="text-xs text-gray-400 mt-1">{cameraName}</p>
          
          {/* Botón de prueba directo */}
          <div className="mt-3">
            <a 
              href="/final_video.mp4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-700 underline"
            >
              Probar video directamente
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative group ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        loop
        muted
        playsInline
        preload="auto"
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        onLoadStart={handleLoadStart}
        onClick={togglePlayPause}
        controls={false}
        crossOrigin="anonymous"
      >
        <source src="/final_video.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
        <source src="/final_video.mp4" type="video/mp4" />
        Su navegador no soporta el elemento video.
      </video>

      {/* Live indicator */}
      {!hasError && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
          LIVE
        </div>
      )}

      {/* Quality indicator */}
      {!hasError && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          HD
        </div>
      )}

      {/* Play/Pause overlay (shows on hover) */}
      {!hasError && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Camera name overlay */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs max-w-[calc(100%-1rem)] truncate">
        {cameraName}
      </div>
    </div>
  );
};

export default VideoPlayer;
