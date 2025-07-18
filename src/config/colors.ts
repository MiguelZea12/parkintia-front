/**
 * Paleta de colores de Parkintia - Estilo BLUEBACK
 */

export const COLORS = {
  // Colores Primarios (degradado azul)
  primary: {
    light: '#5EB8F7',     // Azul Claro
    medium: '#2D8DF6',    // Azul Medio  
    dark: '#1867D3',      // Azul Oscuro
  },
  
  // Colores Secundarios
  secondary: {
    green: '#C7E9D1',     // Verde Pastel (inputs)
    white: '#FFFFFF',     // Blanco (fondo de formularios)
    grayLight: '#A8A8A8', // Gris Claro (texto pequeño)
  },
  
  // Colores de Texto
  text: {
    dark: '#2D2D2D',      // Texto Oscuro (títulos y campos)
    light: '#A8A8A8',    // Texto claro
    white: '#FFFFFF',     // Texto blanco
  },
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(135deg, #5EB8F7 0%, #2D8DF6 50%, #1867D3 100%)',
    primaryReverse: 'linear-gradient(315deg, #5EB8F7 0%, #2D8DF6 50%, #1867D3 100%)',
    light: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
  }
} as const;

// Utilidades CSS personalizadas para Tailwind
export const CUSTOM_STYLES = {
  gradientPrimary: {
    background: COLORS.gradients.primary,
  },
  gradientPrimaryReverse: {
    background: COLORS.gradients.primaryReverse,
  },
  gradientLight: {
    background: COLORS.gradients.light,
  },
  shadowCustom: {
    boxShadow: '0 20px 40px rgba(30, 103, 211, 0.1), 0 10px 20px rgba(30, 103, 211, 0.05)',
  },
  inputFocus: {
    borderColor: COLORS.primary.medium,
    boxShadow: `0 0 0 3px ${COLORS.primary.light}20`,
  }
} as const;
