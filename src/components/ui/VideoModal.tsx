'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/config/colors';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  cameraName: string;
  cameraLocation: string;
  isOnline: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({ 
  isOpen, 
  onClose, 
  cameraName, 
  cameraLocation, 
  isOnline 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl">
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: COLORS.primary.light }}>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: COLORS.text.dark }}>
                {cameraName}
              </h3>
              <p className="text-sm" style={{ color: COLORS.text.light }}>
                {cameraLocation}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isOnline ? 'En línea' : 'Fuera de línea'}</span>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
                style={{ 
                  borderColor: COLORS.text.light,
                  color: COLORS.text.light 
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Video Content */}
          <div className="aspect-video">
            <VideoPlayer 
              isOnline={isOnline} 
              cameraName={cameraName}
              className=""
            />
          </div>

          {/* Footer with controls */}
          <div className="p-4 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                style={{ 
                  borderColor: COLORS.primary.medium,
                  color: COLORS.primary.medium 
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar
              </Button>
              <Button
                variant="outline"
                style={{ 
                  borderColor: COLORS.primary.medium,
                  color: COLORS.primary.medium 
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Compartir
              </Button>
            </div>
            
            <div className="text-sm" style={{ color: COLORS.text.light }}>
              Presiona ESC para cerrar
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VideoModal;
