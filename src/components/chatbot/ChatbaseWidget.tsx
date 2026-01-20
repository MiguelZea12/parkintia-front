'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { COLORS } from '@/config/colors';
import { Bot, Sparkles, X } from 'lucide-react';

// Rutas donde NO debe aparecer el chatbot
const HIDDEN_ROUTES = ['/login', '/register', '/auth'];

/**
 * Componente para integrar el widget de Chatbase
 * Con botón personalizado y soporte para dark/light mode
 */
export const ChatbaseWidget: React.FC = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);

  // No mostrar en rutas de autenticación
  const shouldHide = HIDDEN_ROUTES.some(route => pathname?.startsWith(route));

  useEffect(() => {
    // Detectar tema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }

    // Observer para cambios de tema
    const themeObserver = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Verificar si ya está inicializado
    if (window.chatbase && window.chatbase('getState') === 'initialized') {
      return;
    }

    // Inicializar chatbase si no existe
    if (!window.chatbase) {
      window.chatbase = ((...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      }) as any;

      // Proxy para métodos
      window.chatbase = new Proxy(window.chatbase, {
        get(target: any, prop: string) {
          if (prop === 'q') {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        }
      }) as any;
    }

    // Función para cargar el script
    const onLoad = () => {
      if (document.getElementById('2p0LZp1p96K0yg5zMyYBY')) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = '2p0LZp1p96K0yg5zMyYBY';
      (script as any).domain = 'www.chatbase.co';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    // Observer para detectar cuando se abre/cierra el chat
    observerRef.current = new MutationObserver(() => {
      const iframe = document.querySelector('iframe[src*="chatbase"]');
      if (iframe) {
        const style = window.getComputedStyle(iframe);
        const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && 
                         parseInt(style.height) > 100;
        setIsChatOpen(isVisible);
      }
    });

    // Observar cambios en el body
    setTimeout(() => {
      observerRef.current?.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }, 2000);

    // Cleanup
    return () => {
      window.removeEventListener('load', onLoad);
      themeObserver.disconnect();
      observerRef.current?.disconnect();
    };
  }, []);

  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Ocultar/mostrar widget original según la ruta
  useEffect(() => {
    const hideOrShowChatbase = () => {
      const chatbaseElements = document.querySelectorAll(
        'button[aria-label*="chat" i], #chatbase-bubble-button, [id*="chatbase"] button, iframe[src*="chatbase"]'
      );
      
      chatbaseElements.forEach((el) => {
        (el as HTMLElement).style.display = shouldHide ? 'none' : '';
      });
    };

    hideOrShowChatbase();
    // También ejecutar con un pequeño delay por si el widget se carga tarde
    const timeout = setTimeout(hideOrShowChatbase, 1000);
    
    return () => clearTimeout(timeout);
  }, [shouldHide, pathname]);

  // No renderizar en rutas ocultas
  if (shouldHide) {
    return null;
  }

  const handleClick = () => {
    // Buscar y hacer clic en el botón original de Chatbase
    const selectors = [
      'button[aria-label*="chat" i]',
      '#chatbase-bubble-button',
      '[id*="chatbase"] button',
      'div[style*="position: fixed"][style*="bottom"] button'
    ];

    for (const selector of selectors) {
      const btn = document.querySelector(selector) as HTMLElement;
      if (btn && !btn.classList.contains('parkintia-chat-btn')) {
        btn.click();
        setIsChatOpen(!isChatOpen);
        return;
      }
    }
  };

  return (
    <>
      {/* Botón personalizado */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="parkintia-chat-btn fixed bottom-6 right-6 z-[9999] cursor-pointer transition-all duration-300"
        style={{
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label="Abrir chat de asistente virtual"
      >
        {/* Fondo del botón */}
        <div 
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500"
          style={{
            background: isDarkMode 
              ? `linear-gradient(135deg, ${colors.accent} 0%, ${COLORS.light.primary} 100%)`
              : `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
            boxShadow: isHovered 
              ? `0 12px 40px ${colors.accent}70`
              : `0 8px 32px ${colors.accent}50`
          }}
        >
          {/* Efecto de pulso */}
          {!isChatOpen && (
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: colors.accent }}
            />
          )}
          
          {/* Icono */}
          <div 
            className="relative z-10 transition-all duration-300"
            style={{ 
              transform: isHovered ? 'rotate(-10deg)' : 'rotate(0deg)' 
            }}
          >
            {isChatOpen ? (
              <X className="w-7 h-7 text-white" strokeWidth={2.5} />
            ) : (
              <Bot className="w-7 h-7 text-white" strokeWidth={2} />
            )}
          </div>

          {/* Sparkle badge */}
          {!isChatOpen && (
            <div 
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: isDarkMode ? COLORS.status.warning : '#FACC15',
                boxShadow: '0 2px 8px rgba(250, 204, 21, 0.5)',
                transform: isHovered ? 'scale(1.2) rotate(15deg)' : 'scale(1) rotate(0deg)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* Tooltip */}
        <div 
          className={`
            absolute bottom-full right-0 mb-3 px-4 py-2.5 rounded-xl whitespace-nowrap
            opacity-0 group-hover:opacity-100 pointer-events-none
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
          style={{
            backgroundColor: isDarkMode ? colors.surface : '#FFFFFF',
            border: `1px solid ${colors.border}`,
            color: colors.textPrimary,
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: COLORS.status.success }}
            />
            <span className="text-sm font-semibold">
              {isDarkMode ? '¿Necesitas ayuda?' : '¿Necesitas ayuda?'}
            </span>
          </div>
        </div>
      </button>

      {/* CSS para ocultar el botón original de Chatbase */}
      <style jsx global>{`
        /* Ocultar el botón original de Chatbase */
        button[aria-label*="chat" i]:not(.parkintia-chat-btn),
        #chatbase-bubble-button,
        [id*="chatbase"] button:not(.parkintia-chat-btn),
        div[style*="position: fixed"][style*="bottom"][style*="right"] > button:not(.parkintia-chat-btn) {
          opacity: 0 !important;
          pointer-events: auto !important;
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          width: 64px !important;
          height: 64px !important;
          z-index: 9998 !important;
        }
        
        /* Estilos para el iframe del chat cuando está abierto */
        iframe[src*="chatbase"] {
          border-radius: 20px !important;
          box-shadow: ${isDarkMode 
            ? '0 25px 80px rgba(0, 0, 0, 0.5)' 
            : '0 25px 80px rgba(0, 0, 0, 0.15)'} !important;
          border: 1px solid ${colors.border} !important;
        }
      `}</style>
    </>
  );
};

// Extender el tipo Window para TypeScript
declare global {
  interface Window {
    chatbase?: any;
  }
}
