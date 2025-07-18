'use client';

import React, { useState, useEffect } from 'react';
import { ChatWindow } from './ChatWindow';
import { chatbotService } from '@/services/chatbot.service';
import { COLORS } from '@/config/colors';

export const ChatbotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true); // MODO DEMO: Siempre online
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // MODO DEMO: Comentamos la verificación automática
  // useEffect(() => {
  //   checkServiceStatus();
  //   // Verificar estado cada 2 minutos (menos frecuente para no sobrecargar)
  //   const interval = setInterval(checkServiceStatus, 120000);
  //   return () => clearInterval(interval);
  // }, []);

  const checkServiceStatus = async () => {
    if (isCheckingStatus) return;
    
    setIsCheckingStatus(true);
    try {
      const status = await chatbotService.isServiceAvailable();
      setIsOnline(status);
    } catch (error) {
      console.log('Chatbot offline - verificaré cuando abras el chat');
      setIsOnline(false);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const toggleChat = () => {
    // MODO DEMO: Comentamos la verificación
    // if (!isOpen) {
    //   // Verificar estado cuando se abre el chat
    //   checkServiceStatus();
    // }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleChat}
          className={`
            group relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300
            ${isOpen 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'text-white hover:shadow-xl'
            }
          `}
          style={{ 
            background: isOpen ? undefined : COLORS.gradients.primary,
            boxShadow: isOpen ? undefined : '0 8px 32px rgba(59, 130, 246, 0.4)'
          }}
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        >
          {/* Icono principal */}
          <div className="flex items-center justify-center w-full h-full">
            {isOpen ? (
              // Icono de cerrar (X)
              <svg 
                className="w-6 h-6 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              // Icono de chat
              <svg 
                className="w-7 h-7 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
            )}
          </div>

          {/* Indicador de estado en línea */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1">
              <div className={`
                w-4 h-4 rounded-full border-2 border-white transition-colors duration-300
                ${isOnline 
                  ? 'bg-green-500' 
                  : isCheckingStatus 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }
              `}>
                {isCheckingStatus && (
                  <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                )}
              </div>
            </div>
          )}

          {/* Efecto de pulso para llamar la atención */}
          {!isOpen && isOnline && (
            <div className="absolute inset-0 rounded-full animate-pulse opacity-30" 
                 style={{ background: COLORS.gradients.primary }}>
            </div>
          )}
        </button>

        {/* Tooltip de estado cuando el botón está cerrado */}
        {!isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span>
                  {isOnline 
                    ? 'Asistente disponible' 
                    : isCheckingStatus 
                      ? 'Verificando...' 
                      : 'Asistente sin conexión'
                  }
                </span>
              </div>
              {/* Flecha del tooltip */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay removido - no necesario */}

      {/* Ventana de chat */}
      <ChatWindow 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}; 