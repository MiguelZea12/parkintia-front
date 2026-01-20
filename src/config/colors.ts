/**
 * Paleta de colores de Parkintia
 * Sistema de diseño sin degradados
 * Soporte para Light y Dark mode
 */

export const COLORS = {
  // ============================================
  // LIGHT MODE
  // ============================================
  light: {
    // Colores Principales
    primary: '#0A2540',        // Azul petróleo
    primaryLight: '#0D3A5C',   // Para hover states
    primaryDark: '#081A2E',    // Para estados activos
    
    // Accent (Teal tecnológico)
    accent: '#14B8A6',
    accentLight: '#2DD4BF',
    accentDark: '#0D9488',
    
    // Fondos
    background: '#F8FAFC',
    surface: '#FFFFFF',
    
    // Textos
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    
    // Bordes
    border: '#E2E8F0',
  },
  
  // ============================================
  // DARK MODE
  // ============================================
  dark: {
    // Colores Principales
    primary: '#38BDF8',        // Azul claro para dark mode
    primaryLight: '#7DD3FC',
    primaryDark: '#0EA5E9',
    
    // Accent (mismo que light)
    accent: '#14B8A6',
    accentLight: '#2DD4BF',
    accentDark: '#0D9488',
    
    // Fondos
    background: '#020617',
    surface: '#0F172A',
    
    // Textos
    textPrimary: '#E5E7EB',
    textSecondary: '#9CA3AF',
    
    // Bordes
    border: '#1E293B',
  },
  
  // ============================================
  // COLORES DE ESTADO (compartidos)
  // ============================================
  status: {
    success: '#22C55E',
    warning: '#FACC15',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // ============================================
  // COLORES SEMÁNTICOS PARA PARKING
  // ============================================
  parking: {
    available: '#22C55E',      // Verde - Espacio disponible
    occupied: '#EF4444',       // Rojo - Espacio ocupado
    reserved: '#FACC15',       // Amarillo - Espacio reservado
    disabled: '#64748B',       // Gris - Espacio deshabilitado
  },
} as const;

// CSS Variables helper
export const getCSSVar = (varName: string): string => {
  return `var(--${varName})`;
};

// Hook helper para obtener colores según el tema
export const getThemeColor = (isDark: boolean, colorKey: keyof typeof COLORS.light): string => {
  return isDark ? COLORS.dark[colorKey] : COLORS.light[colorKey];
};
